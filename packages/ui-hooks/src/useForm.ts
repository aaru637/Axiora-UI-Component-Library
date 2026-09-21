import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";

export type FormErrors<T extends object> = Partial<Record<keyof T, string>>;

export interface UseFormOptions<T extends object> {
  initialValues: T;
  validate?: (values: T) => FormErrors<T>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export function useForm<T extends object>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((current) => ({ ...current, [field]: value }));
    },
    [],
  );

  const handleChange = useCallback(
    (field: keyof T) => (event: ChangeEvent<HTMLInputElement>) => {
      setFieldValue(field, event.target.value as T[keyof T]);
    },
    [setFieldValue],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault();

      const nextErrors = validate?.(values) ?? {};
      setErrors(nextErrors);

      if (Object.keys(nextErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit?.(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onSubmit, validate, values],
  );

  return {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleSubmit,
    reset,
  };
}
