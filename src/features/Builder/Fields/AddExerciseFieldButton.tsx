import { useFieldContext } from "../../../form/formKit";
import type { ExerciseSnap } from "../../../Types/Snapshot/SnapshotTypes";

export function AddExerciseFieldButton() {
  const field = useFieldContext<ExerciseSnap[]>();

  return (
    <div
      onClick={() => {
        field.pushValue({
          id: null,
          title: "",
          prompt: "Sample Prompt",
          exerciseType: "CLOZE",
          options: [],
        });
      }}
      className="border-ludoLightPurple text-white text-center hover:cursor-pointer border-2 rounded-md w-20"
    >
      <p>+</p>
    </div>
  );
}
