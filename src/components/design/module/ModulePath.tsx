import { PathRow } from "@/components/design-system/atoms/row/path-row";
import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext";
import { useLessonButton } from "@/features/Hub/ModuleHub/Hooks/useLessonButton";
import { PathButtonPopover } from "@/features/Hub/ModuleHub/Path/PathButtonPopover";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { PathButton } from "./PathButton";
import { PopoverTrigger } from "@radix-ui/react-popover";

type ModulePathProps = { lessons: LudoLesson[]; currentLessonId: string };

export function ModulePath({ lessons, currentLessonId }: ModulePathProps) {
  return lessons.map((lesson: LudoLesson, i: number) => {
    const isCurrent = currentLessonId === lesson.id;

    const { courseId, moduleId } = useCurrentCourseContext();
    const { lessonType, goToLesson } = useLessonButton({
      lesson,
      courseId,
      moduleId,
      isCurrent,
    });

    return (
      <PathRow key={lesson.id} index={i}>
        <PathButtonPopover
          goToLesson={goToLesson}
          lesson={lesson}
          lessonType={lessonType}
        >
          <PopoverTrigger asChild>
            <PathButton
              className="data-[state=open]:translate-y-2
                      data-[state=open]:shadow-none"
              lessonState={lessonType}
            />
          </PopoverTrigger>
        </PathButtonPopover>
      </PathRow>
    );
  });
}
