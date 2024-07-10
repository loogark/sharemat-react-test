import { useEffect, useState } from "react";

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
