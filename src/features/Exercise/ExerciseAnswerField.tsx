import { Fragment, useCallback, useEffect, useMemo } from "react";
import { splitPromptGaps } from "./util";
import { OptionInputSlot } from "../../components/Atoms/CodeOption/OptionInputSlot.tsx";
import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { InlineCode } from "../../components/Atoms/Code/InlineCode.tsx";
import { useInputAssistance } from "../../Hooks/Logic/Input/useInputAssistance";
import type { AnswerToken } from "@/Hooks/Logic/Exercises/useExerciseFlow.tsx";

type ExerciseAnswerFieldProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
};

export function ExerciseAnswerField({
  answerField,
  options,
  userResponses,
  setAnswerAt,
}: ExerciseAnswerFieldProps) {
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
    <p className="text-white text-lg text-left leading-loose font-light">
      {parts.map((part, index) => (
        <Fragment key={index}>
          <InlineCode lineHeight="26px" code={part} />
          {index < parts.length - 1 && (
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
