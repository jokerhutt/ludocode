import type { LessonCompletion } from "@/features/Hub/ModuleHub/Path/ModulePathButton.tsx";
import { ludoNavigation } from "@/routes/utils/-ludoNavigation.tsx";
import type { LudoLesson } from "@/types/Catalog/LudoLesson.ts";
import { useRouter } from "@tanstack/react-router";

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
  const router = useRouter();
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
