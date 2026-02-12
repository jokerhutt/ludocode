import {
  CurriculumPreviewContent,
  CurriculumPreviewFooter,
  CurriculumPreviewHeader,
} from "./CurriculumList";
import type { CurriculumDraftLesson } from "@ludocode/types";
import { ShadowLessButton } from "./ShadowLessButton";
import { router } from "@/main";
import { adminNavigation } from "@/constants/adminNavigation";

type LessonDetailPreviewProps = {
  lesson: CurriculumDraftLesson;
  courseId: string;
};

export function LessonDetailPreview({ lesson, courseId }: LessonDetailPreviewProps) {
  const { title } = lesson;

  return (
    <div className="flex rounded-lg min-h-0 text-white border-3 border-ludo-border max-h-1/2 flex-col w-full">
      <CurriculumPreviewHeader>
        <p className="text-white font-bold">{title}</p>
        <ShadowLessButton
          onClick={() =>
            router.navigate(
              adminNavigation.curriculum.toLesson(courseId, lesson.id),
            )
          }
        >
          <p className="text-sm">Edit Exercises</p>
        </ShadowLessButton>
      </CurriculumPreviewHeader>

      <CurriculumPreviewContent>
        <div className="h-200"></div>
      </CurriculumPreviewContent>

      <CurriculumPreviewFooter>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <ShadowLessButton variant="white">
          <p className="text-sm">Cheatsheet</p>
        </ShadowLessButton>
      </CurriculumPreviewFooter>
    </div>
  );
}
