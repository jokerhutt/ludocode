import { Fragment, useCallback, useMemo } from "react";
import type { LudoExerciseOption } from "@/types/Exercise/LudoExerciseOption.ts";
import { useInputAssistance } from "@/features/Lesson/Hooks/useInputAssistance.tsx";
import type { AnswerToken } from "@/features/Lesson/Hooks/useExercise.tsx";
import { splitPromptGaps } from "@/features/Lesson/Util/inputUtil.ts";
import { InlineCode } from "@/components/design-system/atoms/code/inline-code.tsx";
import { OptionInputSlot } from "@/components/design-system/atoms/option/option-input-slot.tsx";

type LudoCodeBlockProps = {
  answerField: string;
  options: LudoExerciseOption[];
  withGaps?: boolean;
  userResponses: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
};

export function LudoCodeBlock({
  answerField,
  withGaps = false,
  options,
  userResponses,
  setAnswerAt,
}: LudoCodeBlockProps) {
  const { refs, focusPrev, focusNextEmptyAfter, jumpOnValidWord } =
    useInputAssistance({ options, userResponses });

  const parts = useMemo(
    () => splitPromptGaps(answerField, "___"),
    [answerField]
  );
  const gaps = parts.length - 1;

  const responses = useMemo(
    () =>
      Array.from(
        { length: gaps },
        (_, i) => userResponses[i] ?? { id: undefined, value: "" }
      ),
    [gaps, userResponses]
  );

  const handleChange = useCallback(
    (index: number, rawValue: string) => {
      const trimmed = rawValue.trim();
      const match = options.find((o) => o.content.trim() === trimmed);
      console.log("MAtch: " + JSON.stringify(match));
      setAnswerAt(index, { id: match?.id, value: trimmed });
      jumpOnValidWord(index, rawValue);
    },
    [options, setAnswerAt, jumpOnValidWord]
  );

  return (
    <p
      className="  text-white text-lg text-start items-center leading-loose font-light
  flex flex-wrap
  *:mr-1
  [&>*:last-child]:mr-0
  gap-y-2
  overflow-x-hidden"
    >
      {parts.map((part, index) => (
        <Fragment key={index}>
          <InlineCode lineHeight="26px" code={part} />
          {withGaps && index < parts.length - 1 && (
            <OptionInputSlot
              value={responses[index].value}
              onChange={(value) => handleChange(index, value)}
              ref={(el: HTMLInputElement) => (refs.current[index] = el)}
              onBackspaceIfEmpty={() => focusPrev(index)}
              onTokenFinished={() => focusNextEmptyAfter(index)}
            />
          )}
        </Fragment>
      ))}
    </p>
  );
}
