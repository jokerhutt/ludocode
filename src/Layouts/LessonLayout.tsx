import { Outlet } from "@tanstack/react-router";
import { GlobalFooter } from "../components/Footer/GlobalFooter";
import { TutorialHeader } from "../features/Tutorial/TutorialHeader";
import { lessonRoute } from "../routes/router";
import { useExerciseState } from "../Hooks/Exercises/useExerciseState";
import { LessonContext } from "../features/Tutorial/useLessonContext";
import { TutorialFooter } from "../features/Tutorial/TutorialFooter";
import { MainContentWrapper } from "./LayoutWrappers/MainContentWrapper";

export function LessonLayout() {
  const { lessonId } = lessonRoute.useParams();
  const { exercise } = lessonRoute.useSearch();
  const exercisePosition = Number(exercise ?? 1);

  const state = useExerciseState({ exercisePosition, lessonId });

  const { exercises, canSubmit, goToNextExercise } = state;

  return (
    <LessonContext.Provider value={state}>
      <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
        <TutorialHeader
          total={exercises.length}
          position={exercisePosition - 1}
        />
        <MainContentWrapper>
          <Outlet />
        </MainContentWrapper>
        <TutorialFooter submitAnswer={goToNextExercise} canSubmit={canSubmit} />
      </div>
    </LessonContext.Provider>
  );
}
