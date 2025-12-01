import { Outlet } from "@tanstack/react-router";
import { lessonPageRoute, lessonRoute, router } from "../../routes/router";
import { LessonContext } from "../../Hooks/Context/Lesson/useLessonContext";

import { useExercise } from "@/Hooks/Logic/Exercises/useExercise";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { MainGridWrapper } from "@/components/LudoComponents/Layouts/Grids/MainGridWrapper";
import { HeaderWithProgress } from "@/components/LudoComponents/Blocks/Header/HeaderWithProgress";
import { MainContentWrapper } from "@/components/LudoComponents/Layouts/Grids/MainContentWrapper";
import { LessonFooter } from "@/components/LudoComponents/Blocks/Footer/LessonFooter";

export function LessonLayout() {
  const { exercises, lesson } = lessonRoute.useLoaderData();
  const { exercise: position } = lessonPageRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExercise({ exercises, lesson, position });

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
