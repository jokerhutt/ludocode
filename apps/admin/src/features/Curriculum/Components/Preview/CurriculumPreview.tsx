import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "../CurriculumList";
import type { CurriculumDraft, CurriculumDraftLesson } from "@ludocode/types";
import { ModulePreviewItem } from "./ModulePreviewItem";

type CurriculumPreviewProps = {
  selectedLesson: CurriculumDraftLesson | null;
  onLessonClick: (lesson: CurriculumDraftLesson) => void;
  modules: CurriculumDraft["modules"];
  onEditClick: () => void;
};

export function CurriculumPreview({
  onLessonClick,
  modules,
  selectedLesson,
  onEditClick,
}: CurriculumPreviewProps) {
  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumPreviewHeader>
        <p className="text-white font-bold">Curriculum Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
          onClick={onEditClick}
        >
          <p className="text-sm">Edit Curriculum</p>
        </LudoButton>
      </CurriculumPreviewHeader>

      <CurriculumPreviewContent>
        {modules.map((module) => (
          <ModulePreviewItem
            selectedLesson={selectedLesson}
            onLessonClick={onLessonClick}
            title={module.title}
            lessons={module.lessons}
          />
        ))}
      </CurriculumPreviewContent>

      <CurriculumPreviewFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <p className="text-xs">Revision: 6</p>
      </CurriculumPreviewFooter>
    </div>
  );
}
