import { Outlet } from "@tanstack/react-router";
import { HeaderWithProgress } from "../features/Lesson/HeaderWithProgress";
import { lessonRoute, lessonSectionRoute } from "../routes/router";
import { LessonContext } from "../features/Lesson/useLessonContext";
import { LessonFooter } from "../components/Molecules/Footer/LessonFooter";
import { MainContentWrapper } from "./Grids/MainContentWrapper";
import { MainGridWrapper } from "./Grids/MainGridWrapper";
import { ExitDialog } from "@/components/Molecules/Dialog/ExitDialog";
import { useModal } from "@/Hooks/UI/useModal";
import { useExercise } from "@/Hooks/Logic/Exercises/useExercise";

export function LessonLayout() {
  const { exercises, lesson } = lessonSectionRoute.useLoaderData();
  const { exercise: position } = lessonRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExercise({ exercises, lesson, position });

  const {
    modalOpen: exitOpen,
    openModal: openExit,
    closeModal: closeExit,
  } = useModal();

  //TODO move exit dialog
  return (
    <LessonContext.Provider value={state}>
      <MainGridWrapper className="max-h-dvh" gridRows="FULL">
        <HeaderWithProgress
          total={exercises.length}
          position={exercisePosition - 1}
          onExit={() => openExit()}
        />
        <MainContentWrapper>
          <div className="grid col-span-full h-full grid-cols-12">
            <Outlet />
          </div>
        </MainContentWrapper>
        <LessonFooter />
      </MainGridWrapper>

      <ExitDialog close={() => closeExit()} open={exitOpen} />
    </LessonContext.Provider>
  );
}
