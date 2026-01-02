import { cn } from "@ludocode/design-system/cn-utils";
import type { LessonStatus } from "@ludocode/types";

type CompletionRibbonProps = {
  lessonState: LessonStatus;
};

export function CompletionRibbon({ lessonState }: CompletionRibbonProps) {
  const showComplete = lessonState == "COMPLETE" || lessonState == "MASTERED";
  const showMastered = lessonState == "MASTERED";

  return (
    <>
      {showComplete && <InnerRibbon className="bg-ludoLightPurple" />}
      {showMastered && <OuterRibbon className="bg-pathPurple" />}
    </>
  );
}
type RibbonProps = {
  className?: string;
};

export function InnerRibbon({ className }: RibbonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -top-1.5 -right-12 w-30 h-3 bg-ludoLightPurple -rotate-135 rounded",
        className
      )}
    />
  );
}

export function OuterRibbon({ className }: RibbonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -top-1.5 -right-8 w-30 h-3 bg-pythonBlue -rotate-135 rounded",
        className
      )}
    />
  );
}
