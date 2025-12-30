import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext.tsx";
import { useLessonButton } from "@/features/Hub/ModuleHub/Hooks/useLessonButton.tsx";
import { PathPopover } from "@/features/Hub/ModuleHub/Components/Path/PathPopover.tsx";
import type { LudoLesson } from "../../../../../../../../packages/types/Catalog/LudoLesson.ts";
import type { ReactNode } from "react";
import React from "react";
import { cn } from "../../../../../../../../packages/design-system/cn-utils.ts";
import { CompletionRibbon } from "../../../../../../../../packages/design-system/primitives/ribbon.tsx";
import { LudoButton } from "../../../../../../../../packages/design-system/primitives/ludo-button.tsx";
import { LockIcon } from "../../../../../../../../packages/design-system/primitives/custom-icon.tsx";


type PathRowProps = {
  children: ReactNode;
  index: number;
};

export function PathRow({ children, index }: PathRowProps) {
  const position = index % 2 == 0 ? "flex-row-reverse" : "flex-row";

  return (
    <div className={`w-full min-w-0 relative flex items-center ${position}`}>
      {children}
    </div>
  );
}

type ModulePathRowProps = {
  lesson: LudoLesson;
  isCurrent: boolean;
  index: number;
};

export function ModulePathRow({
  lesson,
  isCurrent,
  index,
}: ModulePathRowProps) {
  const { courseId, moduleId } = useCurrentCourseContext();

  const { lessonType, goToLesson } = useLessonButton({
    lesson,
    courseId,
    moduleId,
    isCurrent,
  });

  return (
    <PathRow index={index}>
      <PathPopover
        goToLesson={goToLesson}
        lessonType={lessonType}
        lesson={lesson}
        trigger={
          <PathButton
            lessonState={lessonType}
            className="data-[state=open]:translate-y-2 data-[state=open]:shadow-none"
          />
        }
      />
    </PathRow>
  );
}

type ModulePathProps = { lessons: LudoLesson[]; currentLessonId: string };

export function ModulePath({ lessons, currentLessonId }: ModulePathProps) {
  return lessons.map((lesson: LudoLesson, i: number) => {
    const isCurrent = currentLessonId === lesson.id;

    return (
      <ModulePathRow
        key={lesson.id}
        lesson={lesson}
        isCurrent={isCurrent}
        index={i}
      />
    );
  });
}

type PathButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  lessonState: LessonStatus;
  isCurrent?: boolean;
};

export const PathButton = React.forwardRef<HTMLButtonElement, PathButtonProps>(
  ({ lessonState, isCurrent, className, ...props }, ref) => {
    const isLocked = lessonState === "LOCKED";

    return (
      <LudoButton
        ref={ref}
        selected={isCurrent}
        className={cn("relative w-20 h-20 overflow-hidden", className)}
        {...props}
      >
        <CompletionRibbon lessonState={lessonState} />
        {isLocked && <LockIcon className="text-ludoGrayDark h-10 w-10" />}
      </LudoButton>
    );
  }
);
