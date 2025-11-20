import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import type { LudoLesson } from "@/Types/Catalog/LudoLesson";
import type { ReactNode } from "react";
import type { LessonCompletion } from "./PathButton";

type PathButtonPopoverProps = {
  lesson: LudoLesson;
  children: ReactNode;
  goToLesson: () => void;
  lessonType: LessonCompletion;
};

export function PathButtonPopover({
  lesson,
  goToLesson,
  children,
  lessonType,
}: PathButtonPopoverProps) {
  
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
      <PopoverContent className="w-60 mt-2 bg-ludoGrayLight border-ludoLightPurple">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none text-white font-medium">
              Lesson #{lesson.orderIndex}
            </h4>
            <p className="text-white/80 text-sm">{lesson.title}</p>
          </div>
          <Button
            onClick={() => goToLesson()}
            variant={popoverStyle[lessonType].variant}
            className="w-full my-2"
          >
            {popoverStyle[lessonType].text}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
