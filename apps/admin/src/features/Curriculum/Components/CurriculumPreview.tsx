import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { CurriculumModuleList } from "./CurriculumModuleList";
import {
  CurriculumListBody,
  CurriculumListFooter,
  CurriculumListHeader,
} from "./CurriculumList";
import type { CurriculumDraft, CurriculumDraftLesson, LessonSnap, ModuleSnap } from "@ludocode/types";

type CurriculumPreviewProps = {
  selectedLesson: CurriculumDraftLesson | null;
  onLessonClick: (lesson: CurriculumDraftLesson) => void;
  modules: CurriculumDraft["modules"];
};

export function CurriculumPreview({
  onLessonClick,
  modules,
  selectedLesson,
}: CurriculumPreviewProps) {
  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full">
      <CurriculumListHeader>
        <p className="text-white font-bold">Curriculum Preview</p>
        <LudoButton
          className="w-auto h-auto px-4 py-1 rounded-sm"
          shadow={false}
          variant="alt"
        >
          <p className="text-sm">Edit Curriculum</p>
        </LudoButton>
      </CurriculumListHeader>

      <CurriculumListBody>
        {modules.map((module) => (
          <CurriculumModuleList
            selectedLesson={selectedLesson}
            onLessonClick={onLessonClick}
            title={module.title}
            lessons={module.lessons}
          />
        ))}
      </CurriculumListBody>

      <CurriculumListFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <p className="text-xs">Revision: 6</p>
      </CurriculumListFooter>
    </div>
  );
}
