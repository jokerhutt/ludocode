import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "@/features/Curriculum/Components/CurriculumList";
import { cn } from "@ludocode/design-system/cn-utils";
import type { SubjectsDraftSnapshot } from "@ludocode/types";


type SubjectsPaneProps = {
  subjects: SubjectsDraftSnapshot[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function SubjectsPane({
  subjects,
  selectedId,
  onSelect,
}: SubjectsPaneProps) {
  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumPreviewHeader>
        <p className="font-bold">Subjects</p>
      </CurriculumPreviewHeader>

      <CurriculumPreviewContent className="gap-2">
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
      </CurriculumPreviewContent>

      <CurriculumPreviewFooter>
        <p className="text-xs">{subjects.length} subjects</p>
      </CurriculumPreviewFooter>
    </div>
  );
}