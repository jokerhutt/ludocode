import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { LudoLesson } from "../../../../../../../packages/types/Catalog/LudoLesson.ts";
import { useRouter } from "@tanstack/react-router";
import type { LessonStatus } from "../Components/Path/Path.tsx";

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

  const lessonType: LessonStatus = isCurrent
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
