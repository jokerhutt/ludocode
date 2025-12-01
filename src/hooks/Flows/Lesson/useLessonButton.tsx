import type { LessonCompletion } from "@/features/Module/Path/ModulePathButton";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
import { router } from "@/routes/router";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";

type Args = { lesson: LudoLesson; isCurrent: boolean };

export function useLessonButton({ lesson, isCurrent }: Args) {
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

  return { lessonType, goToLesson };
}
