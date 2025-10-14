import { CompletionRibbon } from "./CompletionRibbon";
import { YellowRibbon } from "./YellowRibbon";

export type LessonCompletion = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED"



export function PathButton() {

  const lessonType : LessonCompletion = "COMPLETE"  

  return (
    <button
      className="relative inline-flex items-center justify-center
                 w-20 h-20 rounded-3xl bg-gray-700 overflow-hidden
                 shadow-[0_10px_0_#1F2328] active:translate-y-2 active:shadow-none"
    >
    <CompletionRibbon lessonState={lessonType}/>
    </button>
  );
}
