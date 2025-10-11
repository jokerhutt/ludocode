import { Fragment, useMemo } from "react";
import { splitPromptGaps } from "./util";
import { SelectionOptionButton } from "./SelectionOptionButton";
import { PromptAnswerField } from "./PromptAnswerField";
import { useInputAssistance } from "../../Hooks/Input/useInputAssistance";

type ExercisePrompt = {
  prompt: string;
  options: string[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
};

export function ExercisePrompt({
  prompt,
  options,
  userResponses: userResponses,
  setAnswerAt,
}: ExercisePrompt) {

  const parts = useMemo(() => splitPromptGaps(prompt, "___"), [prompt]);

  const { refs, focusPrev, focusNextEmptyAfter, jumpOnValidWord } =
    useInputAssistance({ options, userResponses });

  const handleChange = (index: number, value: string) => {
    setAnswerAt(index, value);
    jumpOnValidWord(index, value);
  };

  return (
    <p className="text-white text-xl leading-loose font-light">
      {parts.map((part, index) => (
        <Fragment key={index}>
          <span>{part}</span>
          {index < parts.length - 1 && (
            <PromptAnswerField>
              <SelectionOptionButton
                value={userResponses[index]}
                onChange={(value) => handleChange(index, value)}
                ref={(el: HTMLInputElement) => (refs.current[index] = el)}
                onBackspaceIfEmpty={() => focusPrev(index)}
                onTokenFinished={() => focusNextEmptyAfter(index)}
              />
            </PromptAnswerField>
          )}
        </Fragment>
      ))}
    </p>
  );
}
