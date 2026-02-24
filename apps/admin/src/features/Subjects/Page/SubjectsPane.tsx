import { cn } from "@ludocode/design-system/cn-utils";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { CreateSubjectDialog } from "../Components/Dialog/CreateSubjectDialog";
import { useState } from "react";
import { LudoPreviewPanel } from "@ludocode/design-system/widgets/ludo-preview-panel";

type SubjectsPaneProps = {
  subjects: SubjectsDraftSnapshot[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export function SubjectsPane({
  subjects,
  selectedId,
  onSelect,
}: SubjectsPaneProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <LudoPreviewPanel>
      <LudoPreviewPanel.Header>
        <p className="font-bold">Subjects</p>

        <CreateSubjectDialog
          open={isCreateOpen}
          close={() => setIsCreateOpen(false)}
        >
          <ShadowLessButton
            variant="white"
            onClick={() => setIsCreateOpen(true)}
          >
            <p className="text-sm">Add Subject</p>
          </ShadowLessButton>
        </CreateSubjectDialog>
      </LudoPreviewPanel.Header>

      <LudoPreviewPanel.Content className="gap-2">
        {subjects.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "bg-ludo-background h-10 text-ludoAltText px-4 py-2 w-full rounded-sm flex items-center justify-between hover:cursor-pointer",
              selectedId === s.id && "border-2 border-ludo-accent",
            )}
          >
            <p className="text-sm">{s.name}</p>
            <p className="text-xs text-ludo-accent-muted">/{s.slug}</p>
          </div>
        ))}
      </LudoPreviewPanel.Content>

      <LudoPreviewPanel.Footer>
        <p className="text-xs">{subjects.length} subjects</p>
      </LudoPreviewPanel.Footer>
    </LudoPreviewPanel>
  );
}
