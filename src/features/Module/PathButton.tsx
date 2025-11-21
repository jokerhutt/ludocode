import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import { PathButtonTrigger } from "./PathButtonTrigger";
import { PathButtonPopover } from "./PathButtonPopover";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";

type PathButtonProps = {
  lesson: LudoLesson;
  isCurrent: boolean;
};

export function PathButton({ lesson, isCurrent }: PathButtonProps) {
  const { courseId } = moduleRoute.useParams();

  const isCompleted = lesson.isCompleted;

  const isLocked = !lesson.isCompleted && !isCurrent;

  const lessonType: LessonCompletion = isCurrent
    ? "COMPLETE"
    : isCompleted
    ? "MASTERED"
    : isLocked
    ? "LOCKED"
    : "DEFAULT";

  const goToLesson = () => {
    if (isLocked) return;
    router.navigate(ludoNavigation.lesson.start("Python", lesson.id));
  };

  return (
    <PathButtonPopover goToLesson={goToLesson} lesson={lesson} lessonType={lessonType}>
      <PathButtonTrigger lessonType={lessonType} />
    </PathButtonPopover>
  );
}
