import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useState, type ReactNode } from "react";
import type { ExerciseType } from "@/types/Exercise/ExerciseType.ts";
import { Button } from "@/components/external/ui/button.tsx";
import type { ExerciseSnap } from "@/types/Builder/BuilderSnapshotTypes.ts";
import { newExercises } from "@/features/Builder/Util/NewExerciseTemplates.ts";
import { DialogWrapper } from "@/components/design-system/blocks/dialog/dialog-wrapper.tsx";

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
