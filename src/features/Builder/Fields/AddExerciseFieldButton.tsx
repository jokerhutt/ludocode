import { uuid } from "@tanstack/react-form";
import { useFieldContext } from "../../../form/formKit";
import type { ExerciseSnap } from "../../../Types/Snapshot/SnapshotTypes";

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
          correctOptions: [{answerOrder: 1, content: "Correct"}],
          distractors: [{answerOrder: null, content: "Distractor"}]
        });
      }}
      className="border-ludoLightPurple text-white text-center hover:cursor-pointer border-2 rounded-md w-20"
    >
      <p>+</p>
    </div>
  );
}
