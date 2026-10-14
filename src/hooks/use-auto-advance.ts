import { useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";

/**
 * Cycles an index every `durationMs` while `active` is true, exposing a 0→1
 * progress motion value for the current item. Pauses on demand and stays put
 * for users who prefer reduced motion.
 */
export function useAutoAdvance(count: number, active: boolean, durationMs: number) {
  const [index, setIndex] = useState(0);
  const progress = useMotionValue(0);
  const pausedRef = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !active) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (!pausedRef.current) {
        const next = progress.get() + dt / durationMs;
        if (next >= 1) {
          progress.set(0);
          setIndex((i) => (i + 1) % count);
        } else {
          progress.set(next);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, active, durationMs, progress, reduce]);

  const select = (i: number) => {
    progress.set(0);
    setIndex(((i % count) + count) % count);
  };
  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return { index, select, progress, pause, resume };
}
