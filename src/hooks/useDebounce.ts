import { useEffect, useState } from "react";

/**
 * Custom hook that debounces a value.
 *
 * @template T - The type of the value being debounced.
 * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds before the value is considered debounced. Default is 300ms.
 * @param initialValue - The initial value to use before the debounced value is set. Default is the provided value.
 * @returns A tuple containing the debounced value and a boolean indicating if the value is currently being debounced.
 */
export const useDebounce = <T>(
  value: T,
  delay = 300,
  initialValue: T = value
) => {
  const [debounced, setDebounced] = useState(initialValue);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timeout = setTimeout(() => {
      setIsDebouncing(false);
      setDebounced(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
      setIsDebouncing(false);
    };
  }, [value]);

  return [debounced, isDebouncing] as const;
};
