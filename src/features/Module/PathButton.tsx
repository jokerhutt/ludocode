import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import { PathButtonTrigger } from "./PathButtonTrigger";
import { PathButtonPopover } from "./PathButtonPopover";
import { useLessonButton } from "@/Hooks/Logic/Lesson/useLessonButton";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";

type PathButtonProps = {
  lesson: LudoLesson;
  isCurrent: boolean;
};

export function PathButton({ lesson, isCurrent }: PathButtonProps) {
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
