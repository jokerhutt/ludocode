import { useCallback, useRef, type RefObject } from "react";
import { findNextEmptyIndex } from "../../features/Exercise/util";

type Args = {
  options: string[];
  userResponses: string[];
};

type useInputAssistanceResponse = {
  refs: RefObject<HTMLInputElement[]>;
  jumpOnValidWord: (index: number, value: string) => void;
  focusPrev: (index: number) => void;
  focusNextEmptyAfter: (index: number) => void;
};

export function useInputAssistance({
  options,
  userResponses,
}: Args): useInputAssistanceResponse {
  const refs = useRef<HTMLInputElement[]>([]);

  const focusPrev = useCallback((index: number) => {
    const prev = index - 1;
    if (prev >= 0) refs.current[prev]?.focus({ preventScroll: true });
  }, []);

  const focusNextEmptyAfter = useCallback(
    (index: number) => {
      const nextEmptyIndex = findNextEmptyIndex(index, options);
      if (nextEmptyIndex !== -1)
        requestAnimationFrame(() =>
          refs.current[nextEmptyIndex]?.focus({ preventScroll: true })
        );
    },
    [options]
  );

  const jumpOnValidWord = (index: number, value: string) => {
    const trimmed = value.trim();

    if (options.includes(trimmed)) {
      const nextIndex = findNextEmptyIndex(index, userResponses);
      if (nextIndex !== -1) {
        refs.current[nextIndex]?.focus({ preventScroll: true });
      }
    }
  };

  return { refs, jumpOnValidWord, focusPrev, focusNextEmptyAfter };
}
