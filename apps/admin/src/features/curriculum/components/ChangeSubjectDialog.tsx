import { DialogTitle } from "@ludocode/external/ui/dialog.tsx";
import { type ReactNode, useEffect, useState } from "react";
import { LudoDialog } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { Spinner } from "@ludocode/external/ui/spinner.tsx";
import {
  LudoSelect,
  LudoSelectItem,
} from "@ludocode/design-system/primitives/select.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { useChangeSubject } from "@/features/curriculum/hooks/useChangeSubject.tsx";

type ChangeSubjectDialogProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
  courseId: string;
  currentSubjectSlug?: string;
};

export function ChangeSubjectDialog({
  open,
  close,
  children,
  courseId,
  currentSubjectSlug,
}: ChangeSubjectDialogProps) {
  const { data: subjects } = useSuspenseQuery(qo.allSubjects());
  const changeMutation = useChangeSubject({ courseId });

  const [selectedSlug, setSelectedSlug] = useState<string>("");

  const hasChanged = currentSubjectSlug !== selectedSlug;

  useEffect(() => {
    if (open) {
      setSelectedSlug(currentSubjectSlug ?? "");
    }
  }, [open, currentSubjectSlug]);

  const isLoading = changeMutation.isPending;

  const handleSubmit = () => {
    if (!hasChanged) {
      close();
      return;
    }
    const selected = subjects.find((s) => s.slug === selectedSlug);
    if (!selected) return;

    changeMutation.mutate(
      { subjectId: selected.id },
      {
        onSuccess: () => {
          close();
        },
      },
    );
  };

  return (
    <LudoDialog
      trigger={children}
      open={open}
      onOpenChange={(next) => {
        if (next) return;
        close();
      }}
    >
      <DialogTitle className="text-ludo-white-bright font-bold text-xl">
        Change Subject
      </DialogTitle>

      <div className="flex flex-col gap-6 mt-4">
        <LudoSelect
          variant="dark"
          title="Subject"
          value={selectedSlug}
          setValue={setSelectedSlug}
        >
          {subjects.map((s) => (
            <LudoSelectItem key={s.id} value={s.slug}>
              <span className="flex items-center gap-2">
                <span>{s.name}</span>
                <span className="text-xs text-ludo-white">/{s.slug}</span>
              </span>
            </LudoSelectItem>
          ))}
        </LudoSelect>

        <LudoButton
          disabled={isLoading || !selectedSlug}
          variant="alt"
          onClick={handleSubmit}
          className="w-full flex justify-center"
        >
          {hasChanged ? "Change Subject" : "Exit"}
          {isLoading && <Spinner className="ml-2 text-ludo-accent-muted" />}
        </LudoButton>
      </div>
    </LudoDialog>
  );
}
