import { CodeBoxWrapper } from "@/components/design-system/blocks/wrapper/code-box-wrapper.tsx";
import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField.tsx";

import { useLessonContext } from "@/hooks/Context/Lesson/useLessonContext.tsx";
import { useExerciseBodyData } from "@/hooks/Flows/Exercises/useExerciseBodyData.tsx";
import { OptionListWrapper } from "@/components/design-system/blocks/wrapper/option-list-wrapper.tsx";
import { WideClickableOption } from "@/components/design-system/atoms/option/wide-clickable-option.tsx";

export function AnalyzeExercise() {
  const { currentExercise, inputState } = useLessonContext();
  const { options, replaceAnswerAt, currentExerciseInputs, prompt } =
    useExerciseBodyData(currentExercise, inputState);

  return (
    <>
      <CodeBoxWrapper>
        <ExerciseAnswerField
          options={options}
          answerField={prompt!}
          userResponses={currentExerciseInputs}
          setAnswerAt={replaceAnswerAt}
        />
      </CodeBoxWrapper>

      <OptionListWrapper type="COLUMN">
        {options.map((option) => (
          <WideClickableOption
            setAnswerAt={replaceAnswerAt}
            option={option}
            userSelections={currentExerciseInputs}
          />
        ))}
      </OptionListWrapper>
    </>
  );
}
