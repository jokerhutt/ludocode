import { CustomIcon, LockIcon } from "@/components/Atoms/Icons/CustomIcon";
import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import { CompletionRibbon } from "./CompletionRibbon";

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
    router.navigate(ludoNavigation.lesson.start("Python", lesson.id));
  };

  return (
    <button
      onClick={() => goToLesson()}
      className={`relative hover:cursor-pointer inline-flex items-center justify-center
                 w-20 h-20 rounded-3xl bg-ludoGrayLight  overflow-hidden
                 shadow-[0_10px_0_#262E57] active:translate-y-2 active:shadow-none`}
    >
      {lessonType == "LOCKED" && (
        <LockIcon className="absolute text-ludoGrayDark h-10 w-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
      )}
      <CompletionRibbon lessonState={lessonType} />
    </button>
  );
}
