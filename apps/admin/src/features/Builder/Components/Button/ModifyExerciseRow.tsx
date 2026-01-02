import { AddExerciseDialog } from "@/features/Builder/Components/Dialog/AddExerciseDialog.tsx";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";
import { Button } from "@ludocode/external/ui/button";
import type { ExerciseSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";

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
