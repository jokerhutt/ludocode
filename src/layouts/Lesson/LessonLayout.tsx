import { Outlet } from "@tanstack/react-router";
import { lessonPageRoute, lessonRoute, router } from "../../routes/router";
import { LessonContext } from "@/hooks/Context/Lesson/useLessonContext";

import { useExercise } from "@/hooks/Flows/Exercises/useExercise";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { HeaderWithProgress } from "@/components/design-system/blocks/header/header-with-progress.tsx";
import { MainContentWrapper } from "@/components/design-system/layouts/grid/main-content-wrapper.tsx";
import { LessonFooter } from "@/features/Exercise/UI/Footer/LessonFooter.tsx";

export function LessonLayout() {
  const { exercises, lesson } = lessonRoute.useLoaderData();
  const { exercise: position } = lessonPageRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExercise({ exercises, lesson, position });

  return (
    <LessonContext.Provider value={state}>
      <MainGridWrapper className="max-h-dvh" gridRows="FULL">
        <HeaderWithProgress
          onExit={() => router.navigate(ludoNavigation.hub.module.toCurrent())}
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
