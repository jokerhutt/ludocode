import { Fragment, useMemo, useRef } from "react";
import { splitPromptGaps } from "./util";
import { SelectionOptionButton } from "./SelectionOptionButton";
import { PromptAnswerField } from "./PromptAnswerField";

type ExercisePrompt = {
  prompt: string;
  options: string[];
  userAnswer: string[];
  setAnswerAt: (index: number, value: string) => void;
};

export function ExercisePrompt({
  prompt,
  options,
  userAnswer,
  setAnswerAt,
}: ExercisePrompt) {
  const parts = useMemo(() => splitPromptGaps(prompt, "___"), [prompt]);

  const isToken = (s: string) => options.includes(s.trim());
  const refs = useRef<HTMLInputElement[]>([]);

  const focusPrev = (index: number) => {
    const prev = index - 1;
    if (prev >= 0) refs.current[prev]?.focus({ preventScroll: true });
  };

  const focusNextEmptyAfter = (i: number, nextState: string[]) => {
    const j = nextState.findIndex((s, idx) => idx > i && s === "");
    if (j !== -1)
      requestAnimationFrame(() =>
        refs.current[j]?.focus({ preventScroll: true })
      );
  };

  const handleChange = (index: number, value: string) => {
    setAnswerAt(index, value);
    const trimmed = value.trim();
    if (options.includes(trimmed)) {
      const nextIndex = userAnswer.findIndex(
        (s, idx) => idx > index && s === ""
      );
      if (nextIndex !== -1) {
        refs.current[nextIndex]?.focus({ preventScroll: true });
      }
    }
  };

  return (
    <p className="text-white text-xl leading-loose font-light">
      {parts.map((part, index) => (
        <Fragment key={index}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <PromptAnswerField>
              <SelectionOptionButton
                value={userAnswer[index]}
                onChange={(value) => handleChange(index, value)}
                ref={(el: HTMLInputElement) => (refs.current[index] = el)}
                onBackspaceIfEmpty={() => focusPrev(index)}
                onTokenFinished={() => focusNextEmptyAfter(index, options)}
              />
            </PromptAnswerField>
          )}
        </Fragment>
      ))}
    </p>
  );
}
