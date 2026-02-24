import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { CurriculumDraft, CurriculumDraftLesson } from "@ludocode/types";
import { ModulePreviewItem } from "./ModulePreviewItem";
import { LudoPreviewPanel } from "@ludocode/design-system/widgets/ludo-preview-panel";

type CurriculumPreviewProps = {
  selectedLesson: CurriculumDraftLesson | null;
  onLessonClick: (lesson: CurriculumDraftLesson) => void;
  modules: CurriculumDraft["modules"];
  onEditClick: () => void;
};

export function CurriculumPreviewPanel({
  onLessonClick,
  modules,
  selectedLesson,
  onEditClick,
}: CurriculumPreviewProps) {
  return (
    <LudoPreviewPanel>
      <LudoPreviewPanel.Header>
        <p className="text-white font-bold">Curriculum Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
          onClick={onEditClick}
        >
          <p className="text-sm">Edit Curriculum</p>
        </LudoButton>
      </LudoPreviewPanel.Header>

      <LudoPreviewPanel.Content>
        {modules.map((module) => (
          <ModulePreviewItem
            selectedLesson={selectedLesson}
            onLessonClick={onLessonClick}
            title={module.title}
            lessons={module.lessons}
          />
        ))}
      </LudoPreviewPanel.Content>

      <LudoPreviewPanel.Footer>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <p className="text-xs">Revision: 6</p>
      </LudoPreviewPanel.Footer>
    </LudoPreviewPanel>
  );
}
