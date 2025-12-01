
import { WideClickableOption } from "@/components/LudoComponents/Atoms/CodeOption/WideClickableOption";
import { OptionListWrapper } from "@/components/LudoComponents/Blocks/Wrapper/OptionListWrapper";
import { useLessonContext } from "@/Hooks/Context/Lesson/useLessonContext";
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
