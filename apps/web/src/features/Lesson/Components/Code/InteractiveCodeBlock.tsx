import { Fragment, useCallback, useMemo } from "react";
import type { LudoExerciseOption } from "@ludocode/types/Exercise/LudoExerciseOption.ts";
import { useInputAssistance } from "@/features/Lesson/Hooks/useInputAssistance.tsx";
import { splitPromptGaps } from "@/features/Lesson/Util/inputUtil.ts";
import { OptionInputSlot } from "@ludocode/design-system/primitives/option-input-slot.tsx";
import { InlineCode } from "@ludocode/design-system/primitives/inline-code.tsx";
import type { AnswerToken } from "@ludocode/types";

type InteractiveCodeBlockProps = {
  answerField: string;
  options: LudoExerciseOption[];
  withGaps?: boolean;
  userResponses: AnswerToken[];
  typing?: boolean;
  setAnswerAt: (index: number, value: AnswerToken) => void;
};

export function InteractiveCodeBlock({
  answerField,
  withGaps = false,
  options,
  typing,
  userResponses,
  setAnswerAt,
}: InteractiveCodeBlockProps) {
  const { refs, focusPrev, focusNextEmptyAfter, jumpOnValidWord } =
    useInputAssistance({ options, userResponses });

  const parts = useMemo(
    () => splitPromptGaps(answerField, "___"),
    [answerField],
  );
  const gaps = parts.length - 1;

  const responses = useMemo(
    () =>
      Array.from(
        { length: gaps },
        (_, i) => userResponses[i] ?? { id: undefined, value: "" },
      ),
    [gaps, userResponses],
  );

  const handleChange = useCallback(
    (index: number, rawValue: string) => {
      const trimmed = rawValue.trim();
      const match = options.find((o) => o.content.trim() === trimmed);
      console.log("MAtch: " + JSON.stringify(match));
      setAnswerAt(index, { id: match?.id, value: trimmed });
      jumpOnValidWord(index, rawValue);
    },
    [options, setAnswerAt, jumpOnValidWord],
  );

  return (
    <div className="flex items-start gap-3 md:gap-5 min-w-0">
      <div className="select-none shrink-0 pt-0.5">
        {Array.from(
          {
            length: Math.max(
              1,
              parts.filter((p) => p.includes("\n")).length + 1,
            ),
          },
          (_, i) => (
            <div
              key={i}
              className="text-xs md:text-sm leading-8 md:leading-9 text-white/15 text-right font-mono tabular-nums w-5 md:w-6"
            >
              {i + 1}
            </div>
          ),
        )}
      </div>

      <p
        className="text-white text-sm md:text-base text-start items-center leading-8 md:leading-9 font-light
  flex flex-wrap
  *:mr-1 sm:*:mr-1.5
  [&>*:last-child]:mr-0
  gap-y-2
  overflow-x-auto
  min-w-0 flex-1"
      >
        {parts.map((part, index) => (
          <Fragment key={index}>
            <InlineCode lineHeight="36px" code={part} />
            {withGaps && index < parts.length - 1 && (
              <OptionInputSlot
                disabled={!typing}
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
    </div>
  );
}
