
import {
  CurriculumListBody,
  CurriculumListFooter,
  CurriculumListHeader,
} from "./CurriculumList";
import type { CurriculumDraftLesson} from "@ludocode/types";
import { ShadowLessButton } from "./ShadowLessButton";

type LessonPreviewProps = { lesson: CurriculumDraftLesson };

export function LessonPreview({ lesson }: LessonPreviewProps) {
  const { title } = lesson;

  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border max-h-1/2 flex-col w-full">
      <CurriculumListHeader>
        <p className="text-white font-bold">{title}</p>
        <ShadowLessButton>
          <p className="text-sm">Edit Exercises</p>
        </ShadowLessButton>
      </CurriculumListHeader>

      <CurriculumListBody>
        <div className="h-200"></div>
      </CurriculumListBody>

      <CurriculumListFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <ShadowLessButton variant="white">
          <p className="text-sm">Cheatsheet</p>
        </ShadowLessButton>
      </CurriculumListFooter>
    </div>
  );
}
