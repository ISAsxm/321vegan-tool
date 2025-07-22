import { useCallback, useRef } from "react";

export function useDebounce(delay = 3000) {
  const timeoutRef = useRef();

  return useCallback(
    (callback) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(callback, delay);
    },
    [delay]
  );
}
