import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import type { ReactElement } from "react";
import { LudoPopover } from "@/components/design/popover/LudoPopover";
import { XSquareIcon } from "lucide-react";
import { LudoButton } from "@/components/design/LudoButton";
import type { LessonCompletion } from "@/components/design/module/types";

type PathPopoverProps = {
  trigger: ReactElement;
  lesson: LudoLesson;
  goToLesson: () => void;
  lessonType: LessonCompletion;
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
          withRing={false}
          ringClass="items-end"
          className="h-7 w-26 rounded-sm"
          variant="alt"
        >
          <p className="text-sm">{popoverStyle[lessonType].text}</p>
        </LudoButton>
      </div>
    </LudoPopover>
  );
}
