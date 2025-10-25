import { useCallback, useRef, type RefObject } from "react";
import type { LudoExerciseOption } from "../../../Types/Exercise/LudoExerciseOption";
import { findNextEmptyIndex } from "../../../features/Exercise/util";

type Args = {
  options: LudoExerciseOption[];
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
  const optionPrompts = options.map((option) => option.content);

  const refs = useRef<HTMLInputElement[]>([]);

  const focusPrev = useCallback((index: number) => {
    const prev = index - 1;
    if (prev >= 0) refs.current[prev]?.focus({ preventScroll: true });
  }, []);

  const focusNextEmptyAfter = useCallback(
    (index: number) => {
      const nextEmptyIndex = findNextEmptyIndex(index, optionPrompts);
      if (nextEmptyIndex !== -1)
        requestAnimationFrame(() =>
          refs.current[nextEmptyIndex]?.focus({ preventScroll: true })
        );
    },
    [options, optionPrompts]
  );

  const jumpOnValidWord = (index: number, value: string) => {
    const trimmed = value.trim();

    if (optionPrompts.includes(trimmed)) {
      const nextIndex = findNextEmptyIndex(index, userResponses);
      if (nextIndex !== -1) {
        refs.current[nextIndex]?.focus({ preventScroll: true });
      }
    }
  };

  return { refs, jumpOnValidWord, focusPrev, focusNextEmptyAfter };
}
