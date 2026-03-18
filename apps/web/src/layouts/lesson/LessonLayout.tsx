import { getRouteApi, Outlet, useRouter } from "@tanstack/react-router";
import {
  LessonEvaluationContext,
  LessonExerciseContext,
  LessonSubmissionContext,
  useLessonEvaluation,
  useLessonExercise,
  useLessonSubmission,
} from "@/features/lesson/context/useLessonContext.tsx";
import { useLesson } from "@/features/lesson/hooks/useLesson";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { LessonHeader } from "@/features/lesson/zones/LessonHeader.tsx";
import { MainContentWrapper } from "@ludocode/design-system/layouts/grid/main-content-wrapper.tsx";
import { LessonFooter } from "@/features/lesson/zones/LessonFooter.tsx";
import { LessonFeedbackDrawer } from "@/features/lesson/zones/LessonFeedbackDrawer.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import { UserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";
import { track } from "@/analytics/track";
import { cn } from "@ludocode/design-system/cn-utils.ts";
import { useGuidedExerciseState } from "@/features/lesson/guided/hooks/useGuidedExerciseState";
import { GuidedExerciseContext } from "@/features/lesson/guided/context/useGuidedExerciseContext.tsx";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { useExerciseInput } from "@/features/lesson/hooks/normal/useExerciseInput";
import { ExerciseInputContext } from "@/features/lesson/context/useExerciseInputContext.tsx";
import { Suspense, useEffect, useRef } from "react";

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
  const hasPageUnloadRef = useRef(false);
  const submissionStorageKey = `lesson-submission-history:${courseId}:${lesson.id}`;
  const guidedStorageKey = `lesson-guided-working-snapshots:${courseId}:${lesson.id}`;

  useEffect(() => {
    const onBeforeUnload = () => {
      hasPageUnloadRef.current = true;
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  useEffect(() => {
    return () => {
      if (hasPageUnloadRef.current) return;
      window.sessionStorage.removeItem(submissionStorageKey);
      window.sessionStorage.removeItem(guidedStorageKey);
    };
  }, [guidedStorageKey, submissionStorageKey]);

  const state = useLesson({
    courseId,
    exercises,
    lesson,
    position: exercisePosition,
    config: {
      audioEnabled: preferences.audioEnabled,
    },
  });
  const guidedState = useGuidedExerciseState({
    courseId,
    lessonId: lesson.id,
    currentExercise: state.exercise.currentExercise,
    exercises,
    position: exercisePosition,
    submissionHistory: state.submission.submissionHistory,
    lessonProjectSnapshot: lesson.projectSnapshot,
  });
  const shouldUseGuidedLayout =
    state.exercise.currentExercise.interaction?.type === "EXECUTABLE";

  return (
    <UserPreferencesContext.Provider value={preferences}>
      <LessonExerciseContext.Provider value={state.exercise}>
        <LessonEvaluationContext.Provider value={state.evaluation}>
          <LessonSubmissionContext.Provider value={state.submission}>
            <GuidedExerciseContext.Provider value={guidedState}>
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
                {shouldUseGuidedLayout ? (
                  <GuidedLessonContent />
                ) : (
                  <NormalLessonContent />
                )}
              </MainGridWrapper>
            </GuidedExerciseContext.Provider>
          </LessonSubmissionContext.Provider>
        </LessonEvaluationContext.Provider>
      </LessonExerciseContext.Provider>
    </UserPreferencesContext.Provider>
  );
}

function NormalLessonContent() {
  const { currentExercise } = useLessonExercise();
  const { dismissIncorrectFeedback } = useLessonEvaluation();
  const { submissionHistory } = useLessonSubmission();
  const { correctInputs } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });
  const inputState = useExerciseInput({
    currentExercise,
    correctInputs,
    onInputInteraction: dismissIncorrectFeedback,
  });

  return (
    <ExerciseInputContext.Provider value={inputState}>
      <MainContentWrapper>
        <div className="grid col-span-full h-full grid-cols-12">
          <Suspense fallback={<div />}>
            <Outlet />
          </Suspense>
        </div>
      </MainContentWrapper>
      <LessonFeedbackDrawer />
      <LessonFooter />
    </ExerciseInputContext.Provider>
  );
}

function GuidedLessonContent() {
  return (
    <MainContentWrapper>
      <div className="grid col-span-full h-full grid-cols-12">
        <Suspense fallback={<div />}>
          <Outlet />
        </Suspense>
      </div>
    </MainContentWrapper>
  );
}
