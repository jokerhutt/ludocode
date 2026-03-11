import { getRouteApi, useLocation, useRouter } from "@tanstack/react-router";
import type { SyncState } from "@ludocode/types/Completion/SyncState.ts";
import { useSubmitLesson } from "@/queries/mutations/useSubmitLesson.tsx";
import { useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";

const NO_SUBMISSION_GRACE_MS = 3_000;

const SYNC_TIMEOUT_MS = 10_000;

function isSyncState(s: any): s is SyncState {
  return s && typeof s === "object" && "submission" in s;
}

export function SyncingPage() {
  const routeApi = getRouteApi("/app/sync/$lessonId");
  const { state } = useLocation();
  const router = useRouter();
  const { oldStreak } = routeApi.useLoaderData();
  const submitLesson = useSubmitLesson({ oldStreak });
  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());
  const { data: courseProgress } = useSuspenseQuery(
    qo.courseProgress(currentCourseId),
  );

  const hasSubmittedRef = useRef(false);
  const submission = isSyncState(state) ? state.submission : null;

  useEffect(() => {
    if (!submission) return;
    if (hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    submitLesson.mutate(submission);
  }, [submission]);

  useEffect(() => {
    if (submission || hasSubmittedRef.current) return;

    const id = setTimeout(() => {
      if (!hasSubmittedRef.current) {
        router.navigate(
          ludoNavigation.hub.module.toModule(
            currentCourseId,
            courseProgress.moduleId,
          ),
        );
      }
    }, NO_SUBMISSION_GRACE_MS);
    return () => clearTimeout(id);
  }, [submission, router]);

  useEffect(() => {
    if (!hasSubmittedRef.current) return;

    const id = setTimeout(() => {
      if (submitLesson.isPending) {
        router.navigate(
          ludoNavigation.hub.module.toModule(
            currentCourseId,
            courseProgress.moduleId,
          ),
        );
      }
    }, SYNC_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [submitLesson.isPending]);

  if (submitLesson.isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-2xl text-ludo-white-bright">
            Something went wrong
          </h1>
          <p className="text-ludo-white-bright/70 text-sm">
            We couldn't sync your progress. Please try again.
          </p>
          <div className="flex gap-4">
            <LudoButton
              variant="alt"
              className="h-10 px-5 rounded-lg text-sm font-semibold"
              onClick={() => {
                hasSubmittedRef.current = false;
                submitLesson.reset();
                if (submission) {
                  submitLesson.mutate(submission);
                  hasSubmittedRef.current = true;
                }
              }}
            >
              Retry
            </LudoButton>
            <LudoButton
              variant="alt"
              className="h-10 px-5 rounded-lg text-sm font-semibold"
              onClick={() => router.navigate(ludoNavigation.app.index())}
            >
              Back to Courses
            </LudoButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl text-ludo-white-bright">
          Syncing your progress
        </h1>
        <PropagateLoader color="white" />
      </div>
    </div>
  );
}
