import { ModuleEditorCard } from "./ModuleEditorCard";

type CurriculumEditorProps = {};

export function CurriculumEditor({}: CurriculumEditorProps) {
  return (
    <div className="w-full h-full min-h-0 pr-2 overflow-y-auto scrollbar-ludo-accent flex flex-col gap-4">
      <ModuleEditorCard />
      <ModuleEditorCard />
      <ModuleEditorCard />
    </div>
  );
}
