import type { ReactElement } from "react";
import {
  XIcon,
  LockIcon,
  PlayIcon,
  StarIcon,
  RotateCcwIcon,
} from "lucide-react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { LudoPopover } from "@ludocode/design-system/widgets/ludo-popover.tsx";
import type { LessonStatus, LudoLesson } from "@ludocode/types";
import { PopoverClose } from "@radix-ui/react-popover";

type PathPopoverProps = {
  trigger: ReactElement;
  lesson: LudoLesson;
  goToLesson: () => void;
  lessonType: LessonStatus;
};

const popoverConfig: Record<
  LessonStatus,
  {
    text: string;
    variant: "default" | "alt" | "danger";
    icon: typeof PlayIcon;
    disabled: boolean;
  }
> = {
  LOCKED: {
    text: "Locked",
    variant: "default",
    icon: LockIcon,
    disabled: true,
  },
  MASTERED: {
    text: "Review",
    variant: "default",
    icon: RotateCcwIcon,
    disabled: false,
  },
  COMPLETE: { text: "Master", variant: "alt", icon: StarIcon, disabled: false },
  DEFAULT: { text: "Start", variant: "alt", icon: PlayIcon, disabled: false },
};

export function PathPopover({
  trigger,
  lesson,
  goToLesson,
  lessonType,
}: PathPopoverProps) {
  const config = popoverConfig[lessonType];
  const Icon = config.icon;

  return (
    <LudoPopover trigger={trigger} className="flex-col gap-3 min-w-72">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-bold text-white leading-snug">
            {lesson.title}
          </p>
          <p className="text-xs text-ludoAltText leading-relaxed">
            Learn how to use Python to print text to the console!
          </p>
        </div>
        <PopoverClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="shrink-0 rounded-md p-1 text-ludoAltText hover:text-white hover:bg-ludo-surface transition-colors"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </PopoverClose>
      </div>

      {/* Action */}
      <PopoverClose asChild>
        <LudoButton
          data-testid={`path-popover-button-${lesson.id}`}
          onClick={() => goToLesson()}
          className="h-9 w-full rounded-lg text-sm font-semibold gap-2"
          variant={config.variant}
          shadow={!config.disabled}
          disabled={config.disabled}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.text}
        </LudoButton>
      </PopoverClose>
    </LudoPopover>
  );
}
