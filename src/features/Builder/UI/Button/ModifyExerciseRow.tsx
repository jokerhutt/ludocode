
import { AddExerciseDialog } from "@/features/Builder/UI/Dialog/AddExerciseDialog.tsx";
import { DeleteDialog } from "@/components/design-system/composites/dialog/delete-dialog.tsx";
import { Button } from "@/components/external/ui/button";
import type { ExerciseSnap } from "@/types/Builder/BuilderSnapshotTypes.ts";

type ModifyExerciseRowProps = {
  canRemoveExercises: boolean;
  createExercise: (newExercise: ExerciseSnap) => void;
  removeExercise: () => void;
};

export function ModifyExerciseRow({
  canRemoveExercises,
  removeExercise,
  createExercise,
}: ModifyExerciseRowProps) {
  return (
    <div className="w-full flex gap-4 items-center py-2 justify-end">
      <AddExerciseDialog onClick={createExercise}>
        <Button>Add Exercise</Button>
      </AddExerciseDialog>

      <DeleteDialog
        canDelete={canRemoveExercises}
        targetName="Exercise"
        onClick={removeExercise}
      >
        <Button>Delete</Button>
      </DeleteDialog>
    </div>
  );
}
