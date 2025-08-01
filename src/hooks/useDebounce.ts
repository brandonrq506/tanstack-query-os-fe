import { useEffect, useState } from "react";

const DEBOUNCE_DELAY = 150;

export function useDebounce<T>(value: T, delay: number = DEBOUNCE_DELAY): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debouncedValue;
}
