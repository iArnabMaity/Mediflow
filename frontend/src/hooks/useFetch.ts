// useFetch Hook - Data fetching with loading/error state
import React, { useState, useCallback, useRef } from 'react';
import { handleApiError } from '../services/api';

interface UseFetchOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  retries?: number;
  retryDelay?: number;
}

interface UseFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFetch = <T, >(
  fetchFn: () => Promise<T>,
  options: UseFetchOptions<T> = {}
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const attemptRef = useRef(0);

  const { onSuccess, onError, retries = 3, retryDelay = 1000 } = options;

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    attemptRef.current = 0;

    const executeRequest = async (): Promise<void> => {
      try {
        const result = await fetchFn();
        setData(result);
        onSuccess?.(result);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));

        if (attemptRef.current < retries) {
          attemptRef.current += 1;
          await new Promise((resolve) => setTimeout(resolve, retryDelay * attemptRef.current));
          return executeRequest();
        }

        setError(errorObj);
        onError?.(errorObj);
      } finally {
        setIsLoading(false);
      }
    };

    return executeRequest();
  }, [fetchFn, onSuccess, onError, retries, retryDelay]);

  return { data, isLoading, error, refetch };
};

export default useFetch;
