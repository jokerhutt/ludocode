import { Outlet } from "@tanstack/react-router";
import { LessonHeader } from "../features/Lesson/LessonHeader";
import { lessonRoute, lessonSectionRoute } from "../routes/router";
import { LessonContext } from "../features/Lesson/useLessonContext";
import { LessonFooter } from "../components/Molecules/Footer/LessonFooter";
import { MainContentWrapper } from "./Grids/MainContentWrapper";
import { MainGridWrapper } from "./Grids/MainGridWrapper";
import { useExerciseFlow } from "../Hooks/Logic/Exercises/useExerciseFlow";
import { ExitDialog } from "@/components/Molecules/Dialog/ExitDialog";
import { useModal } from "@/Hooks/UI/useModal";

export function LessonSectionLayout() {
  const { exercises, lesson } = lessonSectionRoute.useLoaderData();
  const { exercise: position } = lessonRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExerciseFlow({ exercises, lesson, position });

  const {
    modalOpen: exitOpen,
    openModal: openExit,
    closeModal: closeExit,
  } = useModal();

  const {
    currentExercise,
    canSubmit,
    submitAttemptBuffer,
    commitAttempt,
    submissionBuffer,
  } = state;

  return (
    <LessonContext.Provider value={state}>
      <MainGridWrapper className="max-h-dvh" gridRows="FULL">
        <LessonHeader
          total={exercises.length}
          position={exercisePosition - 1}
          onExit={() => openExit()}
        />
        <MainContentWrapper>
          <Outlet />
        </MainContentWrapper>
        <LessonFooter
          staged={submissionBuffer}
          stage={submitAttemptBuffer}
          commit={commitAttempt}
          canSubmit={canSubmit}
          isInfo={currentExercise.exerciseType == "INFO"}
        />
      </MainGridWrapper>

      <ExitDialog close={() => closeExit()} open={exitOpen} />
    </LessonContext.Provider>
  );
}
