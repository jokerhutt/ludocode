import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardFooter,
  CurriculumCardHeader,
} from "../CurriculumList";
import type { CurriculumDraft, CurriculumDraftLesson } from "@ludocode/types";
import { ModulePreviewItem } from "./ModulePreviewItem";

type CurriculumPreviewProps = {
  selectedLesson: CurriculumDraftLesson | null;
  onLessonClick: (lesson: CurriculumDraftLesson) => void;
  onLessonNavigate?: (lesson: CurriculumDraftLesson) => void;
  modules: CurriculumDraft["modules"];
  onEditClick: () => void;
};

export function CurriculumPreview({
  onLessonClick,
  onLessonNavigate,
  modules,
  selectedLesson,
  onEditClick,
}: CurriculumPreviewProps) {
  return (
    <CurriculumCard>
      <CurriculumCardHeader>
        <p className="text-white font-bold">Curriculum Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
          onClick={onEditClick}
        >
          <p className="text-sm">Edit Curriculum</p>
        </LudoButton>
      </CurriculumCardHeader>

      <CurriculumCardContent className="bg-ludo-background">
        {modules.map((module) => (
          <ModulePreviewItem
            key={module.id}
            selectedLesson={selectedLesson}
            onLessonClick={onLessonClick}
            onLessonNavigate={onLessonNavigate}
            title={module.title}
            lessons={module.lessons}
          />
        ))}
      </CurriculumCardContent>

      <CurriculumCardFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <p className="text-xs">Revision: 6</p>
      </CurriculumCardFooter>
    </CurriculumCard>
  );
}
