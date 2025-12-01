
import { WideClickableOption } from "@/components/design-system/atoms/option/wide-clickable-option.tsx";
import { OptionListWrapper } from "@/components/design-system/blocks/wrapper/option-list-wrapper.tsx";
import { useLessonContext } from "@/hooks/Context/Lesson/useLessonContext";
import { useExerciseBodyData } from "@/hooks/Flows/Exercises/useExerciseBodyData";

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
