import type { LudoLesson } from "../../../../Types/Catalog/LudoLesson";
import { useLessonButton } from "@/Hooks/Logic/Lesson/useLessonButton";
import { PathButtonPopover } from "./PathButtonPopover";
import { PathButtonTrigger } from "./PathButtonTrigger";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";

type ModulePathButtonProps = {
  lesson: LudoLesson;
  isCurrent: boolean;
};

export function ModulePathButton({ lesson, isCurrent }: ModulePathButtonProps) {
  const { lessonType, goToLesson } = useLessonButton({ lesson, isCurrent });

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
