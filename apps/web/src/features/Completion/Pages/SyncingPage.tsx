import { getRouteApi, useLocation } from "@tanstack/react-router";
import type { SyncState } from "@ludocode/types/Completion/SyncState";
import { useSubmitLesson } from "@/hooks/Queries/Mutations/useSubmitLesson.tsx";
import { useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";

type SyncingPageProps = {};

function isSyncState(s: any): s is SyncState {
  return s && typeof s === "object" && "submission" in s;
}

export function SyncingPage({}: SyncingPageProps) {
  const routeApi = getRouteApi("/_app/sync/$lessonId");
  const { state } = useLocation();
  const { oldStreak } = routeApi.useLoaderData();
  const submitLesson = useSubmitLesson({ oldStreak });

  const hasSubmittedRef = useRef(false);
  const submission = isSyncState(state) ? state.submission : null;

  useEffect(() => {
    if (!submission) return;
    if (hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    submitLesson.mutate(submission);
  }, [submission, submitLesson.mutate]);

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-2xl text-white">Syncing your progress</h1>
          <PropagateLoader color="white" />
        </div>
      </div>
    </>
  );
}
