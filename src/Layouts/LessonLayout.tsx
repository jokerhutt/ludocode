import { Outlet } from "@tanstack/react-router";
import { GlobalFooter } from "../components/Footer/GlobalFooter";
import { TutorialHeader } from "../features/Tutorial/TutorialHeader";
import { lessonRoute, lessonSectionRoute } from "../routes/router";
import { LessonContext } from "../features/Tutorial/useLessonContext";
import { TutorialFooter } from "../features/Tutorial/TutorialFooter";
import { MainContentWrapper } from "./LayoutWrappers/MainContentWrapper";
import { MainGridWrapper } from "./LayoutWrappers/MainGridWrapper";
import { useExerciseFlow } from "../Hooks/Exercises/useExerciseFlow";

export function LessonLayout() {
  const { exercises, lesson } = lessonSectionRoute.useLoaderData();
  const { exercise: position } = lessonRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExerciseFlow({ exercises, lesson, position });

  const { canSubmit, submitAttemptBuffer, commitAttempt, submissionBuffer } =
    state;

  return (
    <LessonContext.Provider value={state}>
      <MainGridWrapper gridRows="FULL">
        <TutorialHeader
          total={exercises.length}
          position={exercisePosition - 1}
        />
        <MainContentWrapper>
          <Outlet />
        </MainContentWrapper>
        <TutorialFooter
          staged={submissionBuffer}
          stage={submitAttemptBuffer}
          commit={commitAttempt}
          canSubmit={canSubmit}
        />
      </MainGridWrapper>
    </LessonContext.Provider>
  );
}
