import { getRouteApi, Outlet, useRouter } from "@tanstack/react-router";
import { LessonContext } from "@/features/Lesson/Context/useLessonContext.tsx";

import { useExercise } from "@/features/Lesson/Hooks/useExercise.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { HeaderWithProgress } from "@/components/design-system/blocks/header/header-with-progress.tsx";
import { MainContentWrapper } from "@/components/design-system/layouts/grid/main-content-wrapper.tsx";
import { LessonFooter } from "@/features/Lesson/Zone/LessonFooter.tsx";
import { Suspense } from "react";

export function LessonLayout() {
  const router = useRouter();
  const lessonRoute = getRouteApi("/_app/lesson/$courseId/$moduleId/$lessonId");
  const lessonPageRoute = getRouteApi(
    "/_app/lesson/$courseId/$moduleId/$lessonId/"
  );
  const { courseId, moduleId } = lessonRoute.useParams();

  const { exercises, lesson } = lessonRoute.useLoaderData();
  const { exercise: position } = lessonPageRoute.useSearch();
  const exercisePosition = Number(position ?? 1);

  const state = useExercise({ exercises, lesson, position });

  return (
    <LessonContext.Provider value={state}>
      <MainGridWrapper className="max-h-dvh" gridRows="FULL">
        <HeaderWithProgress
          onExit={() =>
            router.navigate(
              ludoNavigation.hub.module.toModule(courseId, moduleId)
            )
          }
          total={exercises.length}
          position={exercisePosition - 1}
        />
        <MainContentWrapper>
          <div className="grid col-span-full h-full grid-cols-12">
            <Suspense fallback={<div />}>
              <Outlet />
            </Suspense>
          </div>
        </MainContentWrapper>
        <LessonFooter />
      </MainGridWrapper>
    </LessonContext.Provider>
  );
}
