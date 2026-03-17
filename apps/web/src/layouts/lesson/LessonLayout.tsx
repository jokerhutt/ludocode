import { getRouteApi, Outlet, useRouter } from "@tanstack/react-router";
import { LessonContext } from "@/features/lesson/context/useLessonContext.tsx";
import { useExercise } from "@/features/lesson/hooks/useExercise.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { LessonHeader } from "@/features/lesson/zones/LessonHeader.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { LessonFooter } from "@/features/lesson/zones/LessonFooter.tsx";
import { Suspense } from "react";
import { LessonFeedbackDrawer } from "@/features/lesson/zones/LessonFeedbackDrawer.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import { UserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";
import { track } from "@/analytics/track";
import { cn } from "@ludocode/design-system/cn-utils.ts";

export function LessonLayout() {
  const router = useRouter();
  const lessonRoute = getRouteApi("/app/lesson/$courseId/$moduleId/$lessonId");
  const lessonPageRoute = getRouteApi(
    "/app/lesson/$courseId/$moduleId/$lessonId/",
  );

  const { courseId, moduleId } = lessonRoute.useParams();
  const { exercises, lesson } = lessonRoute.useLoaderData();
  const { exercise: position } = lessonPageRoute.useSearch();
  const exercisePosition = Number(position ?? 1);
  const { data: preferences } = useSuspenseQuery(qo.preferences());

  const state = useExercise({
    courseId,
    exercises,
    lesson,
    position: exercisePosition,
    config: {
      audioEnabled: preferences.audioEnabled,
    },
  });
  const shouldUseGuidedLayout =
    state.currentExercise.interaction?.type === "EXECUTABLE";

  return (
    <UserPreferencesContext.Provider value={preferences}>
      <LessonContext.Provider value={state}>
        <MainGridWrapper
          className={cn(
            "max-h-dvh",
            shouldUseGuidedLayout && "grid-rows-[auto_1fr]",
          )}
          gridRows="FULL"
        >
          <LessonHeader
            onExit={() => {
              track({
                event: "LESSON_EXIT",
                properties: {
                  lessonId: lesson.id,
                  exercisePosition: exercisePosition,
                },
              });
              router.navigate(
                ludoNavigation.hub.module.toModule(courseId, moduleId),
              );
            }}
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
          {!shouldUseGuidedLayout && <LessonFeedbackDrawer />}
          {!shouldUseGuidedLayout && <LessonFooter />}
        </MainGridWrapper>
      </LessonContext.Provider>
    </UserPreferencesContext.Provider>
  );
}
