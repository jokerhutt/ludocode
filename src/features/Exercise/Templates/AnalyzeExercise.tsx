import { CodeBoxWrapper } from "@/components/LudoComponents/Blocks/Wrapper/CodeBoxWrapper.tsx";
import { ExerciseAnswerField } from "../UI/AnswerField/ExerciseAnswerField.tsx";

import { useLessonContext } from "@/Hooks/Context/Lesson/useLessonContext.tsx";
import { useExerciseBodyData } from "@/Hooks/Logic/Exercises/useExerciseBodyData.tsx";
import { OptionListWrapper } from "@/components/LudoComponents/Blocks/Wrapper/OptionListWrapper.tsx";
import { WideClickableOption } from "@/components/LudoComponents/Atoms/CodeOption/WideClickableOption.tsx";

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
