import type { LudoExerciseOption } from "../../../../../../packages/types/Exercise/LudoExerciseOption.ts";
import { useCallback, useMemo, useRef } from "react";
import { findNextEmptyIndex } from "../Util/inputUtil.ts";
import type { AnswerToken } from "@ludocode/types";

type Args = {
  options: LudoExerciseOption[];
  userResponses: AnswerToken[];
};

type useInputAssistanceResponse = {
  refs: React.RefObject<HTMLInputElement[]>;
  jumpOnValidWord: (index: number, value: string) => void;
  focusPrev: (index: number) => void;
  focusNextEmptyAfter: (index: number) => void;
};

export function useInputAssistance({
  options,
  userResponses,
}: Args): useInputAssistanceResponse {
  const optionPrompts = options.map((option) => option.content);

  const responses = useMemo(
    () => userResponses.map((t) => (t?.value ?? "").trim()),
    [userResponses]
  );

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

  const jumpOnValidWord = useCallback(
    (index: number, raw: string) => {
      const trimmed = raw.trim();
      if (optionPrompts.includes(trimmed)) {
        const nextIndex = findNextEmptyIndex(index, responses);
        if (nextIndex !== -1)
          refs.current[nextIndex]?.focus({ preventScroll: true });
      }
    },
    [optionPrompts, responses]
  );

  return { refs, jumpOnValidWord, focusPrev, focusNextEmptyAfter };
}
