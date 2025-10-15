import { Fragment, useMemo } from "react";
import { splitPromptGaps } from "./util";
import { OptionInputField } from "./SelectionOptionButton";
import { useInputAssistance } from "../../Hooks/Input/useInputAssistance";
import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { InlineCode } from "./InlineCode";

type ExerciseAnswerFieldProps = {
  answerField: string;
  options: LudoExerciseOption[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
};

export function ExerciseAnswerField({
  answerField,
  options,
  userResponses: userResponses,
  setAnswerAt,
}: ExerciseAnswerFieldProps) {
  const parts = useMemo(
    () => splitPromptGaps(answerField, "___"),
    [answerField]
  );

  const { refs, focusPrev, focusNextEmptyAfter, jumpOnValidWord } =
    useInputAssistance({ options, userResponses });

  const handleChange = (index: number, value: string) => {
    setAnswerAt(index, value);
    jumpOnValidWord(index, value);
  };

  return (
    <p className="text-white text-xl text-left leading-loose font-light">
      {parts.map((part, index) => (
        <Fragment key={index}>
          <InlineCode code={part} />
          {index < parts.length - 1 && (
            <OptionInputField
              value={userResponses[index] ?? ""}
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
