import type { CurriculumDraft } from "@ludocode/types";
import { ModuleEditorCard } from "./ModuleEditorCard";

type CurriculumEditorProps = {modules: CurriculumDraft["modules"]};

export function CurriculumEditor({modules}: CurriculumEditorProps) {
  return (
    <div className="w-full h-full min-h-0 pr-2 overflow-y-auto scrollbar-ludo-accent flex flex-col gap-4">
      {modules.map((module) => (
        <ModuleEditorCard moduleSnap={module} />
      ))}
    </div>
  );
}
