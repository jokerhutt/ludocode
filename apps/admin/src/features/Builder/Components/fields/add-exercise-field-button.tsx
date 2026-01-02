import { uuid } from "@tanstack/react-form";
import type { ExerciseSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";
import { useFieldContext } from "@/constants/form/formKit";

export function AddExerciseFieldButton() {
  const field = useFieldContext<ExerciseSnap[]>();

  return (
    <div
      onClick={() => {
        field.pushValue({
          id: uuid(),
          title: "Default Title",
          prompt: "Sample Prompt",
          exerciseType: "CLOZE",
          correctOptions: [
            { answerOrder: 1, content: "Correct", exerciseOptionId: uuid() },
          ],
          distractors: [
            {
              answerOrder: null,
              content: "Distractor",
              exerciseOptionId: uuid(),
            },
          ],
        });
      }}
      className="border-ludoLightPurple text-white text-center hover:cursor-pointer border-2 rounded-md w-20"
    >
      <p>+</p>
    </div>
  );
}
