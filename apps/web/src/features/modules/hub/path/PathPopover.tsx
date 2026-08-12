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
import { testIds } from "@ludocode/util/test-ids";
import { cn } from "@ludocode/design-system/cn-utils.ts";

type PathPopoverProps = {
  trigger: ReactElement;
  lesson: LudoLesson;
  goToLesson: () => void;
  lessonType: LessonStatus;
};

const popoverConfig: Record<
  LessonStatus,
  {
    status: string;
    text: string;
    icon: typeof PlayIcon;
    disabled: boolean;
  }
> = {
  LOCKED: {
    status: "Locked",
    text: "Locked",
    icon: LockIcon,
    disabled: true,
  },
  MASTERED: {
    status: "Completed",
    text: "Review",
    icon: RotateCcwIcon,
    disabled: false,
  },
  COMPLETE: {
    status: "Completed",
    text: "Master",
    icon: StarIcon,
    disabled: false,
  },
  DEFAULT: {
    status: "Current lesson",
    text: "Start",
    icon: PlayIcon,
    disabled: false,
  },
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
    <LudoPopover trigger={trigger} className="gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5 min-w-0">
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-widest",
              config.disabled
                ? "text-ludo-white-dim"
                : "text-ludo-accent-muted",
            )}
          >
            {config.status}
          </span>
          <p className="text-sm font-bold text-ludo-white-bright leading-snug">
            {lesson.title}
          </p>
        </div>
        <PopoverClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-ludo-white-dim hover:text-ludo-white-bright hover:bg-white/10 transition-colors"
          >
            <XIcon className="h-3.5 w-3.5" />
          </button>
        </PopoverClose>
      </div>

      <PopoverClose asChild>
        <LudoButton
          data-testid={testIds.path.popoverButton(lesson.id)}
          onClick={() => goToLesson()}
          className={cn(
            "h-9 w-full rounded-lg text-sm font-semibold gap-2",
            config.disabled && "bg-white/8 text-ludo-white-dim",
          )}
          variant="alt"
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
