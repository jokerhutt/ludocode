import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { useLessonButton } from "@/hooks/Flows/Lesson/useLessonButton";
import { PathButtonPopover } from "./PathButtonPopover";
import { PathButtonTrigger } from "./PathButtonTrigger";
import { useCurrentCourseContext } from "@/hooks/Context/Progress/CurrentCourseContext";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";

type ModulePathButtonProps = {
  lesson: LudoLesson;
  isCurrent: boolean;
};

export function ModulePathButton({ lesson, isCurrent }: ModulePathButtonProps) {
  const { courseId, moduleId } = useCurrentCourseContext();
  const { lessonType, goToLesson } = useLessonButton({
    lesson,
    courseId,
    moduleId,
    isCurrent,
  });

  return (
    <PathButtonPopover
      goToLesson={goToLesson}
      lesson={lesson}
      lessonType={lessonType}
    >
      <PathButtonTrigger lessonType={lessonType} />
    </PathButtonPopover>
  );
}
