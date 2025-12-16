import { PathRow } from "@/components/design-system/atoms/row/path-row";
import { PathPopover } from "@/features/Hub/ModuleHub/Path/PathPopover";
import { PathButton } from "./PathButton";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { useLessonButton } from "@/features/Hub/ModuleHub/Hooks/useLessonButton";
import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext";

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
