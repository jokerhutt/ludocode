import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import type { ExerciseType } from "@ludocode/types/Exercise/ExerciseType";
import { Button } from "@ludocode/external/ui/button";
import type { ExerciseSnap } from "@ludocode/types/Builder/BuilderSnapshotTypes";
import { newExercises } from "@/features/Builder/Util/NewExerciseTemplates.ts";
import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog";

type AddExerciseDialogProps = {
  onClick: (newExercise: ExerciseSnap) => void;
  children: ReactNode;
};

export function AddExerciseDialog({
  onClick,
  children,
}: AddExerciseDialogProps) {
  const [open, setOpen] = useState(false);

  const possibleOptions: ExerciseType[] = [
    "INFO",
    "ANALYZE",
    "CLOZE",
    "TRIVIA",
  ];

  const handleTypeSelect = (option: ExerciseType) => {
    const newExercise = newExercises[option]();
    onClick(newExercise);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogWrapper>
        <DialogTitle className="text-white">Create Exercise</DialogTitle>
        {possibleOptions.map((option) => (
          <Button onClick={() => handleTypeSelect(option)}>{option}</Button>
        ))}
      </DialogWrapper>
    </Dialog>
  );
}
