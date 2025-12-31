import type { LessonStatus, LudoLesson } from "../../../../../../../../packages/types/Catalog/LudoLesson.ts";
import type { ReactElement } from "react";
import { XSquareIcon } from "lucide-react";
import { LudoPopover } from "../../../../../../../../packages/design-system/widgets/ludo-popover.tsx";
import { LudoButton } from "../../../../../../../../packages/design-system/primitives/ludo-button.tsx";

type PathPopoverProps = {
  trigger: ReactElement;
  lesson: LudoLesson;
  goToLesson: () => void;
  lessonType: LessonStatus;
};

export const popoverStyle = {
  LOCKED: {
    text: "Locked",
    variant: "disabled" as const,
  },
  MASTERED: {
    text: "Review",
    variant: "default" as const,
  },
  COMPLETE: {
    text: "Master",
    variant: "default" as const,
  },
  DEFAULT: {
    text: "Start",
    variant: "default" as const,
  },
};

//TODO add exit functionality for the popover button
export function PathPopover({
  trigger,
  lesson,
  goToLesson,
  lessonType,
}: PathPopoverProps) {
  return (
    <LudoPopover trigger={trigger}>
      <div className="flex flex-col gap-1 text-ludoAltText">
        <p className="font-bold">{lesson.title}</p>
        <p className="text-xs">
          Learn how to use Python to print text to the console!
        </p>
      </div>
      <div className="flex flex-col items-end justify-between">
        <XSquareIcon className="text-ludoLightPurple hover:cursor-pointer h-4 w-4" />
        <LudoButton
          onClick={() => goToLesson()}
          className="h-7 w-20 lg:w-26 rounded-sm"
          variant="alt"
        >
          <p className="text-sm">{popoverStyle[lessonType].text}</p>
        </LudoButton>
      </div>
    </LudoPopover>
  );
}
