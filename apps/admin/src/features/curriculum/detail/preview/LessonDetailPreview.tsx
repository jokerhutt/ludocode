import {
  CurriculumCard,
  CurriculumCardContent,
  CurriculumCardHeader,
} from "../../components/CurriculumList.tsx";
import type { CurriculumDraftLesson } from "@ludocode/types";
import { ShadowLessButton } from "@ludocode/design-system/primitives/shadowless-button.tsx";
import { router } from "@/main.tsx";
import { adminNavigation } from "@/constants/adminNavigation.tsx";
import { FileText } from "lucide-react";

type LessonDetailPreviewProps = {
  lesson: CurriculumDraftLesson;
  courseId: string;
};

export function LessonDetailPreview({
  lesson,
  courseId,
}: LessonDetailPreviewProps) {
  const { title } = lesson;

  const navigateToLesson = () =>
    router.navigate(adminNavigation.curriculum.toLesson(courseId, lesson.id));

  return (
    <CurriculumCard className="">
      <CurriculumCardHeader>
        <p className="text-ludo-white-bright font-bold">{title}</p>
      </CurriculumCardHeader>

      <CurriculumCardContent className="items-center bg-ludo-background justify-center gap-4">
        <FileText className="h-10 w-10 text-ludo-white" />
        <p className="text-ludo-white text-sm text-center">
          View and edit this lesson's exercises
        </p>
        <ShadowLessButton variant="alt" onClick={navigateToLesson}>
          Edit Exercises
        </ShadowLessButton>
      </CurriculumCardContent>
    </CurriculumCard>
  );
}
