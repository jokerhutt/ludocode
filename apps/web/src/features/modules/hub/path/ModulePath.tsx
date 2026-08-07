import {
  LudoPath,
  type PathRail,
} from "@ludocode/design-system/widgets/ludo-path.tsx";
import type { LudoLesson } from "@ludocode/types";
import {
  getLessonStatus,
  useLessonButton,
} from "@/features/modules/hooks/useLessonButton.tsx";
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
  const isReached = (lesson: LudoLesson) =>
    lesson.isCompleted || lesson.id === currentLessonId;

  const moduleComplete = lessons.every((lesson) => lesson.isCompleted);

  let normalLessonCount = 0;
  const lessonRows = lessons.map((lesson, lessonIndex) => {
    const isGuided = lesson.lessonType === "GUIDED";
    const rowIndex = normalLessonCount;
    if (!isGuided) {
      normalLessonCount += 1;
    }

    const nextLesson = lessons[lessonIndex + 1];

    const railAbove: PathRail =
      lessonIndex === 0 ? "none" : isReached(lesson) ? "lit" : "dim";

    const railBelow: PathRail = nextLesson
      ? isReached(nextLesson)
        ? "lit"
        : "dim"
      : nextModuleId
        ? moduleComplete
          ? "lit"
          : "dim"
        : "none";

    return {
      lesson,
      rowIndex,
      isGuided,
      railAbove,
      railBelow,
    };
  });

  return (
    <LudoPath className="pb-6">
      {lessonRows.map(({ lesson, rowIndex, isGuided, ...rail }) => (
        <LudoPath.Row
          key={lesson.id}
          index={rowIndex}
          fullSpan={isGuided}
          {...rail}
          label={
            <LudoPath.Label
              step={rowIndex + 1}
              title={lesson.title}
              state={getLessonStatus(lesson, currentLessonId === lesson.id)}
              isCurrent={currentLessonId === lesson.id}
            />
          }
        >
          <ModulePathButton
            lesson={lesson}
            courseId={courseId}
            moduleId={moduleId}
            currentLessonId={currentLessonId}
          />
        </LudoPath.Row>
      ))}
      {nextModuleId && (
        <LudoPath.Row
          className="mt-6"
          index={normalLessonCount}
          fullSpan
          railAbove={moduleComplete ? "lit" : "dim"}
        >
          <LudoPath.NextButton
            title={nextModuleTitle}
            dataTestId={testIds.module.nextButton}
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
