import { Outlet } from "@tanstack/react-router";
import { HeaderWithProgress } from "../features/Exercise/HeaderWithProgress";
import { lessonRoute, lessonSectionRoute, router } from "../routes/router";
import { LessonContext } from "../features/Exercise/useLessonContext";
import { LessonFooter } from "../components/Molecules/Footer/LessonFooter";
import { MainContentWrapper } from "./Grids/MainContentWrapper";
import { MainGridWrapper } from "./Grids/MainGridWrapper";
import { useExercise } from "@/Hooks/Logic/Exercises/useExercise";
import { ludoNavigation } from "@/routes/ludoNavigation";

export function LessonLayout() {
  const { exercises, lesson } = lessonSectionRoute.useLoaderData();
  const { exercise: position } = lessonRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExercise({ exercises, lesson, position });

  //TODO move exit dialog
  return (
    <LessonContext.Provider value={state}>
      <MainGridWrapper className="max-h-dvh" gridRows="FULL">
        <HeaderWithProgress
          onExit={() => router.navigate(ludoNavigation.module.toCurrent())}
          total={exercises.length}
          position={exercisePosition - 1}
        />
        <MainContentWrapper>
          <div className="grid col-span-full h-full grid-cols-12">
            <Outlet />
          </div>
        </MainContentWrapper>
        <LessonFooter />
      </MainGridWrapper>
    </LessonContext.Provider>
  );
}
