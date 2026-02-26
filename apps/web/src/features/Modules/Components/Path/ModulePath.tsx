import { LudoPath } from "@ludocode/design-system/widgets/LudoPath";
import type { LudoLesson } from "@ludocode/types";
import { useLessonButton } from "../../Hooks/useLessonButton";
import { PathPopover } from "./PathPopover";

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
