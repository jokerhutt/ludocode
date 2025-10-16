import { router } from "../../routes/router";
import { CompletionRibbon } from "./CompletionRibbon";
import { YellowRibbon } from "./YellowRibbon";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED"



export function PathButton() {

  const goToLesson = () => {
    router.navigate({
      to: `/tutorial/$tutorialId/exercise/$position`,
      params: { tutorialId: 1, position: 0 },
    });
  };

  const lessonType : LessonCompletion = "COMPLETE"  

  return (
    <button
        onClick={() => goToLesson()}
      className="relative inline-flex items-center justify-center
                 w-20 h-20 rounded-3xl bg-ludoGrayLight overflow-hidden
                 shadow-[0_10px_0_#262E57] active:translate-y-2 active:shadow-none"
    >
    <CompletionRibbon lessonState={lessonType}/>
    </button>
  );
}
