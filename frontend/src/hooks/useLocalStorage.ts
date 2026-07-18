// useLocalStorage Hook - Persist state in local storage
import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageOptions<T> {
  initialValue?: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}

export const useLocalStorage = <T, >(
  key: string,
  options: UseLocalStorageOptions<T> = {}
): [T | undefined, (value: T | ((val: T | undefined) => T)) => void, () => void] => {
  const { initialValue, serialize = JSON.stringify, deserialize = JSON.parse } = options;

  // State to store our value
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);
      if (item) {
        return deserialize(item);
      }
      return initialValue;
    } catch {
      console.error(`Error reading from localStorage with key "${key}"`);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T | undefined) => T)) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== 'undefined') {
          if (valueToStore === undefined) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, serialize(valueToStore));
          }
        }
      } catch (error) {
        console.error(`Error setting localStorage with key "${key}"`, error);
      }
    },
    [key, serialize, storedValue]
  );

  // Remove value from localStorage
  const remove = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(undefined);
    } catch (error) {
      console.error(`Error removing localStorage with key "${key}"`, error);
    }
  }, [key]);

  return [storedValue, setValue, remove];
};

export default useLocalStorage;
