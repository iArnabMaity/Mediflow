// useForm Hook - Form state management
import React, { useState, useCallback, useRef } from 'react';
import { FormState, FormErrors, FormValidationRules } from '../types';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: FormValidationRules<T>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: <K extends keyof T>(field: K, error: string) => void;
  setFieldTouched: <K extends keyof T>(field: K, isTouched: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
  setValues: (values: T) => void;
  setErrors: (errors: FormErrors<T>) => void;
}

export const useForm = <T extends Record<string, any>, >(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const {
    initialValues,
    onSubmit,
    validate,
    validateOnBlur = true,
    validateOnChange = false,
  } = options;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValuesRef = useRef(initialValues);

  const validateField = useCallback(
    (field: keyof T, value: any): string | undefined => {
      if (!validate || !validate[field]) return undefined;

      const fieldValidators = validate[field];
      if (!fieldValidators) return undefined;

      for (const validator of fieldValidators) {
        const error = validator(value);
        if (error) return error;
      }
      return undefined;
    },
    [validate]
  );

  const validateAllFields = useCallback((): FormErrors<T> => {
    const newErrors: FormErrors<T> = {};
    
    Object.keys(values).forEach((key) => {
      const field = key as keyof T;
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  }, [values, validateField]);

  const isValid =
    Object.keys(errors).length === 0 &&
    Object.keys(touched).length > 0;

  const setFieldValue = useCallback(
    <K extends keyof T, >(field: K, value: T[K]) => {
      setValues((prev) => ({ ...prev, [field]: value }));

      if (validateOnChange) {
        const error = validateField(field, value);
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }));
      }
    },
    [validateOnChange, validateField]
  );

  const setFieldError = useCallback(
    <K extends keyof T, >(field: K, error: string) => {
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    []
  );

  const setFieldTouched = useCallback(
    <K extends keyof T, >(field: K, isTouched: boolean) => {
      setTouched((prev) => ({
        ...prev,
        [field]: isTouched,
      }));

      if (validateOnBlur && isTouched) {
        const error = validateField(field, values[field]);
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }));
      }
    },
    [validateOnBlur, validateField, values]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const actualValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      setFieldValue(name as keyof T, actualValue as any);
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setFieldTouched(name as keyof T, true);
    },
    [setFieldTouched]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setTouched(
        Object.keys(values).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        ) as Partial<Record<keyof T, boolean>>
      );

      const newErrors = validateAllFields();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [values, validateAllFields, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValuesRef.current);
    setErrors({});
    setTouched({});
  }, []);

  const setFormValues = useCallback((newValues: T) => {
    setValues(newValues);
  }, []);

  const setFormErrors = useCallback((newErrors: FormErrors<T>) => {
    setErrors(newErrors);
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues: setFormValues,
    setErrors: setFormErrors,
  };
};

export default useForm;
