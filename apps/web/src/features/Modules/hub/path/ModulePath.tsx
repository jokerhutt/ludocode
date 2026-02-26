import { LudoPath } from "@ludocode/design-system/widgets/ludo-path.tsx";
import type { LudoLesson } from "@ludocode/types";
import { useLessonButton } from "@/features/Modules/hooks/useLessonButton.tsx";
import { PathPopover } from "./PathPopover.tsx";

type ModulePathProps = {
  lessons: LudoLesson[];
  currentLessonId?: string;
  courseId: string;
  moduleId: string;
};

export function ModulePath({
  lessons,
  currentLessonId,
  courseId,
  moduleId,
}: ModulePathProps) {
  return (
    <LudoPath>
      {lessons.map((lesson, index) => (
        <LudoPath.Row index={index}>
          <ModulePathButton
            lesson={lesson}
            courseId={courseId}
            moduleId={moduleId}
            currentLessonId={currentLessonId}
          />
        </LudoPath.Row>
      ))}
    </LudoPath>
  );
}

type ModulePathItemProps = {
  lesson: LudoLesson;
  currentLessonId?: string;
  courseId: string;
  moduleId: string;
};

function ModulePathButton({
  lesson,
  currentLessonId,
  courseId,
  moduleId,
}: ModulePathItemProps) {
  const isCurrent = currentLessonId === lesson.id;

  const { lessonType, goToLesson } = useLessonButton({
    lesson,
    courseId,
    moduleId,
    isCurrent,
  });

  return (
    <PathPopover
      goToLesson={goToLesson}
      lessonType={lessonType}
      lesson={lesson}
      trigger={<LudoPath.Button state={lessonType} isCurrent={isCurrent} className="data-[state=open]:translate-y-2 data-[state=open]:shadow-none" />}
    />
  );
}
