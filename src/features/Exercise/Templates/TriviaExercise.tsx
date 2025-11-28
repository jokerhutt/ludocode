import { OptionListWrapper } from "@/components/Molecules/Wrapper/OptionListWrapper";
import { WideClickableOption } from "../../../components/Atoms/CodeOption/WideClickableOption";
import { useLessonContext } from "@/features/Exercise/useLessonContext";
import { useExerciseBodyData } from "@/Hooks/Logic/Exercises/useExerciseBodyData";

export function TriviaExercise() {
  const { currentExercise, inputState } = useLessonContext();
  const { options, replaceAnswerAt, currentExerciseInputs } =
    useExerciseBodyData(currentExercise, inputState);

  return (
    <OptionListWrapper type="COLUMN">
      {options.map((option) => (
        <WideClickableOption
          setAnswerAt={replaceAnswerAt}
          option={option}
          userSelections={currentExerciseInputs}
        />
      ))}
    </OptionListWrapper>
  );
}
