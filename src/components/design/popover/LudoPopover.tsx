import { Popover, PopoverContent } from "@/components/external/ui/popover";
import type { LessonCompletion } from "@/features/Hub/ModuleHub/Path/ModulePathButton";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { XSquareIcon } from "lucide-react";
import type { ReactNode } from "react";
import { LudoButton } from "../LudoButton";
import { PopoverArrow } from "@radix-ui/react-popover";

type LudoPopoverProps = {
  lesson: LudoLesson;
  children: ReactNode;
  goToLesson: () => void;
  lessonType: LessonCompletion;
};

export function LudoPopover({ children }: LudoPopoverProps) {
  const popoverStyle = {
    LOCKED: {
      text: "Locked",
      variant: "disabled" as const,
    },
    MASTERED: {
      text: "Review",
      variant: "default" as const,
    },
    COMPLETE: {
      text: "Start",
      variant: "default" as const,
    },
    DEFAULT: {
      text: "Start",
      variant: "default" as const,
    },
  };

  return (
    <Popover>
      {children}
      <PopoverContent
        align="end"
        side="bottom"
        className="rounded-lg relative mx-10 flex justify-between pt-3 min-w-90 flex-row mt-2 bg-ludoGrayLight border-ludoLightPurple"
      >
        <PopoverArrow
          className="fill-ludoGrayLight stroke-ludoLightPurple"
          width={12}
          height={6}
        />

        <div className="flex flex-col gap-1 text-ludoAltText">
          <p className="font-bold">Hello World!</p>
          <p className="text-xs">
            Learn how to use Python to print text to the console!
          </p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <XSquareIcon className="text-ludoLightPurple h-4 w-4" />
          <LudoButton
            withRing={false}
            className="h-7 w-26 rounded-sm"
            variant="alt"
          >
            <p className="text-sm">{popoverStyle["COMPLETE"].text}</p>
          </LudoButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
