import { YellowRibbon } from "@/components/Atoms/Ribbon/YellowRibbon";
import { BlueRibbon } from "./BlueRibbon";
import type { LessonCompletion } from "@/features/Module/PathButton";

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
