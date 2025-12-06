import type { LessonCompletion } from "@/features/Hub/ModuleHub/Path/ModulePathButton";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
import { router } from "@/routes/router";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";

type Args = {
  lesson: LudoLesson;
  courseId: string;
  moduleId: string;
  isCurrent: boolean;
};

export function useLessonButton({
  lesson,
  courseId,
  moduleId,
  isCurrent,
}: Args) {
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
    router.navigate(ludoNavigation.lesson.start(courseId, moduleId, lesson.id));
  };

  return { lessonType, goToLesson };
}
