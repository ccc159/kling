import { useEffect, useRef } from 'react';

export function useInterval(callback: () => void | Promise<void>, delay: number | null) {
  const savedCallback = useRef<() => void | Promise<void>>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (!savedCallback.current) return;
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
