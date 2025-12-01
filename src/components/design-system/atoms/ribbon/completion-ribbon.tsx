import type { LessonCompletion } from "@/features/Hub/ModuleHub/Path/ModulePathButton";
import { OuterRibbon } from "./outer-ribbon.tsx";
import { InnerRibbon } from "./inner-ribbon.tsx";

type CompletionRibbonProps = {
  lessonState: LessonCompletion;
};

export function CompletionRibbon({ lessonState }: CompletionRibbonProps) {
  const showComplete = lessonState == "COMPLETE" || lessonState == "MASTERED";
  const showMastered = lessonState == "MASTERED";

  return (
    <>
      {showComplete && <InnerRibbon className="bg-pythonYellow" />}
      {showMastered && <OuterRibbon className="bg-pythonBlue" />}
    </>
  );
}
