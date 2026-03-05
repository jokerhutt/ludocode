import { cn } from "@ludocode/design-system/cn-utils";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { CreateSubjectDialog } from "../Components/Dialog/CreateSubjectDialog";
import { useState } from "react";
import {
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "@/features/Curriculum/Components/CurriculumList";

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
    <div className="flex rounded-lg min-h-0 text-ludo-white-bright border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumCardHeader>
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
      </CurriculumCardHeader>

      <CurriculumCardContent className="gap-2">
        {subjects.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "bg-ludo-background h-10 text-ludo-white px-4 py-2 w-full rounded-sm flex items-center justify-between hover:cursor-pointer",
              selectedId === s.id && "border-2 border-ludo-accent",
            )}
          >
            <p className="text-sm">{s.name}</p>
            <p className="text-xs text-ludo-accent-muted">/{s.slug}</p>
          </div>
        ))}
      </CurriculumCardContent>

      <CurriculumCardFooter>
        <p className="text-xs">{subjects.length} subjects</p>
      </CurriculumCardFooter>
    </div>
  );
}
