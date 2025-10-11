import { Fragment, useMemo } from "react";
import { splitPromptGaps } from "./util";
import { SelectionOptionButton } from "./SelectionOptionButton";
import { PromptAnswerField } from "./PromptAnswerField";

type ExercisePrompt = {
    prompt: string;
    userAnswer: string[];
    setAnswerAt: (index: number, value: string) => void;
};

export function ExercisePrompt({
  prompt,
  userAnswer,
  setAnswerAt
}: ExercisePrompt) {

  const parts = useMemo(
    () => splitPromptGaps(prompt, "___"),
    [prompt]
  );

  return (
    <p className="text-white text-xl leading-loose font-light">
      {parts.map((part, index) => (
        <Fragment key={index}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <PromptAnswerField>
              <SelectionOptionButton
              value={userAnswer[index]}
                onChange={(value) => setAnswerAt(index, value)}
              />
            </PromptAnswerField>
          )}
        </Fragment>
      ))}
    </p>
  );
}
