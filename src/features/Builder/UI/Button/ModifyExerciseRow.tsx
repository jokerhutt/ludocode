import { AddExerciseDialog } from "@/components/Molecules/Dialog/Create/AddExerciseDialog";
import { DeleteDialog } from "@/components/Molecules/Dialog/Warning/DeleteDialog";
import { Button } from "@/components/ui/button";
import type { ExerciseSnap } from "@/Types/Snapshot/SnapshotTypes";

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
