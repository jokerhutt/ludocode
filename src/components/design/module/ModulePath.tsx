import { PathRow } from "@/components/design-system/atoms/row/path-row";
import { useCurrentCourseContext } from "@/features/Hub/Context/CurrentCourseContext";
import { useLessonButton } from "@/features/Hub/ModuleHub/Hooks/useLessonButton";
import { PathPopover } from "@/features/Hub/ModuleHub/Path/PathPopover";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { PathButton } from "./PathButton";
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
  });
}
