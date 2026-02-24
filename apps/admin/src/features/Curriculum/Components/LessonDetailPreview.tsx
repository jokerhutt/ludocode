import type { CurriculumDraftLesson } from "@ludocode/types";
import { ShadowLessButton } from "@ludocode/design-system/primitives/ShadowLessButton.tsx";
import { router } from "@/main";
import { adminNavigation } from "@/constants/adminNavigation";
import { LudoPreviewPanel } from "@ludocode/design-system/widgets/ludo-preview-panel";

type LessonDetailPreviewProps = {
  lesson: CurriculumDraftLesson;
  courseId: string;
};

export function LessonDetailPreview({
  lesson,
  courseId,
}: LessonDetailPreviewProps) {
  const { title } = lesson;

  return (
    <LudoPreviewPanel>
      <LudoPreviewPanel.Header>
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
      </LudoPreviewPanel.Header>

      <LudoPreviewPanel.Content>
        <div className="h-200"></div>
      </LudoPreviewPanel.Content>

      <LudoPreviewPanel.Footer>
        <p className="text-xs">Last Modified: 6th of January at 18:32</p>
        <ShadowLessButton variant="white">
          <p className="text-sm">Cheatsheet</p>
        </ShadowLessButton>
      </LudoPreviewPanel.Footer>
    </LudoPreviewPanel>
  );
}
