import { track } from "@/analytics/track";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type {
  LessonStatus,
  LudoLesson,
} from "@ludocode/types/Catalog/LudoLesson.ts";
import { useRouter } from "@tanstack/react-router";

type Args = {
  lesson: LudoLesson;
  courseId: string;
  moduleId: string;
  isCurrent: boolean;
};

export function getLessonStatus(
  lesson: LudoLesson,
  isCurrent: boolean,
): LessonStatus {
  if (isCurrent) return "DEFAULT";
  if (lesson.isCompleted) return "MASTERED";
  return "LOCKED";
}

export function useLessonButton({
  lesson,
  courseId,
  moduleId,
  isCurrent,
}: Args) {
  const router = useRouter();
  const isLocked = !lesson.isCompleted && !isCurrent;

  const lessonType = getLessonStatus(lesson, isCurrent);

  const goToLesson = () => {
    if (isLocked) return;
    track({ event: "LESSON_START", properties: { lessonId: lesson.id } });
    router.navigate(ludoNavigation.lesson.start(courseId, moduleId, lesson.id));
  };

  return { lessonType, goToLesson };
}
