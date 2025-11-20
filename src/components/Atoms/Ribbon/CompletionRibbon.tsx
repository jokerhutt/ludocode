import { InnerRibbon } from "@/components/Atoms/Ribbon/InnerRibbon";
import { OuterRibbon } from "./OuterRibbon";
import type { LessonCompletion } from "@/features/Module/PathButton";

type CompletionRibbonProps = {
  lessonState: LessonCompletion;
};

export function CompletionRibbon({ lessonState }: CompletionRibbonProps) {
  const showComplete = lessonState == "COMPLETE" || lessonState == "MASTERED";
  const showMastered = lessonState == "MASTERED";

  return (
    <>
      {showComplete && <InnerRibbon className="bg-pythonYellow"/>}
      {showMastered && <OuterRibbon className="bg-pythonBlue"/>}
    </>
  );
}
