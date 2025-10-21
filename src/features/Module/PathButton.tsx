import { ludoNavigation } from "../../routes/ludoNavigation";
import { moduleRoute, router } from "../../routes/router";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import { CompletionRibbon } from "./CompletionRibbon";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";

type PathButtonProps = {
  lesson: LudoLesson;
};

export function PathButton({ lesson }: PathButtonProps) {
  const { courseId } = moduleRoute.useParams();

  const goToLesson = () => {
    router.navigate(ludoNavigation.lesson("Python", lesson.id, 0));
  };

  const lessonType: LessonCompletion = "COMPLETE";

  return (
    <button
      onClick={() => goToLesson()}
      className="relative hover:cursor-pointer inline-flex items-center justify-center
                 w-20 h-20 rounded-3xl bg-ludoGrayLight overflow-hidden
                 shadow-[0_10px_0_#262E57] active:translate-y-2 active:shadow-none"
    >
      <CompletionRibbon lessonState={lessonType} />
    </button>
  );
}
