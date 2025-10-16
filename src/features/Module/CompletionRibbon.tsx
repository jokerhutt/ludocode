import { BlueRibbon } from "./BlueRibbon";
import type { LessonCompletion } from "./PathButton";
import { YellowRibbon } from "./YellowRibbon";

type CompletionRibbonProps = {
  lessonState: LessonCompletion;
};

export function CompletionRibbon({ lessonState }: CompletionRibbonProps) {
  const showComplete = lessonState == "COMPLETE" || lessonState == "MASTERED";
  const showMastered = lessonState == "MASTERED";

  return (
    <>
      {showComplete && <YellowRibbon />}
      {showMastered && <BlueRibbon />}
    </>
  );
}
