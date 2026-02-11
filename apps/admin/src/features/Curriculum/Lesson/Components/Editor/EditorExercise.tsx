import { LudoInput } from "@ludocode/design-system/primitives/input";
import { Grip } from "lucide-react";
import { ExercisePreviewItem } from "../Preview/ExercisePreviewItem";

type EditorExerciseProps = {};

export function EditorExercise({}: EditorExerciseProps) {
  return (
    <div className="w-full flex items-center gap-2">
      <Grip className="h-5 w-5 text-white focus:outline-none focus-visible:outline-none cursor-grab active:cursor-grabbing" />

      <ExercisePreviewItem
        className="bg-ludo-surface"
        title="Sample"
        isSelected={false}
        onClick={() => () => null}
      />
    </div>
  );
}
