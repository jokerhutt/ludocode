import { LudoPath } from "@ludocode/design-system/widgets/ludo-path.tsx";
import type { LudoLesson } from "@ludocode/types";
import { useLessonButton } from "@/features/modules/hooks/useLessonButton.tsx";
import { PathPopover } from "./PathPopover.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";
import { testIds } from "@ludocode/util/test-ids";

type ModulePathProps = {
  lessons: LudoLesson[];
  currentLessonId?: string;
  courseId: string;
  moduleId: string;
  modulesLength: number;
  nextModuleId?: string;
  nextModuleTitle?: string;
};

export function ModulePath({
  lessons,
  currentLessonId,
  courseId,
  moduleId,
  nextModuleId,
  nextModuleTitle,
}: ModulePathProps) {
  let normalLessonCount = 0;
  const lessonRows = lessons.map((lesson) => {
    const isGuided = lesson.lessonType === "GUIDED";
    const rowIndex = normalLessonCount;
    if (!isGuided) {
      normalLessonCount += 1;
    }

    return {
      lesson,
      rowIndex,
      isGuided,
    };
  });

  return (
    <LudoPath className="pb-6">
      {lessonRows.map(({ lesson, rowIndex, isGuided }) => (
        <LudoPath.Row key={lesson.id} index={rowIndex} fullSpan={isGuided}>
          <ModulePathButton
            lesson={lesson}
            courseId={courseId}
            moduleId={moduleId}
            currentLessonId={currentLessonId}
          />
        </LudoPath.Row>
      ))}
      {nextModuleId && (
        <LudoPath.Row className="mt-10" index={normalLessonCount}>
          <LudoPath.NextButton
            title={nextModuleTitle}
            onClick={() =>
              router.navigate(
                ludoNavigation.hub.module.toModule(courseId, nextModuleId),
              )
            }
          />
        </LudoPath.Row>
      )}
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

  const trigger =
    lesson.lessonType === "GUIDED" ? (
      <LudoPath.GuidedButton
        title={lesson.title}
        state={lessonType}
        isCurrent={isCurrent}
        dataTestId={testIds.path.button(lesson.id)}
        className="data-[state=open]:translate-y-1 data-[state=open]:shadow-none"
      />
    ) : (
      <LudoPath.Button
        state={lessonType}
        isCurrent={isCurrent}
        dataTestId={testIds.path.button(lesson.id)}
        className="data-[state=open]:translate-y-1 data-[state=open]:shadow-none"
      />
    );

  return (
    <PathPopover
      goToLesson={goToLesson}
      lessonType={lessonType}
      lesson={lesson}
      trigger={trigger}
    />
  );
}
