import { OptionListWrapper } from "../../../components/Molecules/Wrapper/OptionListWrapper.tsx";
import { ExerciseAnswerField } from "../ExerciseAnswerField.tsx";
import { CodeBoxWrapper } from "../../../components/Molecules/Wrapper/CodeBoxWrapper.tsx";
import { WideClickableOption } from "../../../components/Atoms/CodeOption/WideClickableOption.tsx";
import { useLessonContext } from "@/features/Lesson/useLessonContext.tsx";
import { useExerciseBodyData } from "@/Hooks/Logic/Exercises/useExerciseBodyData.tsx";

export function AnalyzeExercise() {
  const { currentExercise, inputState } = useLessonContext();
  const {
    options,
    replaceAnswerAt,
    currentExerciseInputs,
    prompt,
  } = useExerciseBodyData(currentExercise, inputState);

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
