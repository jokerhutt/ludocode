import { useLocation, useRouterState } from "@tanstack/react-router";
import type { SyncState } from "../../../routes/Packets/SyncState";
import { useSubmitLesson } from "../../../Hooks/Queries/Mutations/useSubmitLesson";
import { useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";
import { syncRoute } from "../../../routes/router";

type SyncingPageProps = {};

function isSyncState(s: any): s is SyncState {
  return s && typeof s === "object" && "submission" in s;
}

export function SyncingPage({}: SyncingPageProps) {
  const { state } = useLocation();
  const { oldStreak } = syncRoute.useLoaderData();
  const submitLesson = useSubmitLesson({ oldStreak });

  useEffect(() => {
    if (!isSyncState(state) || submitLesson.isPending || submitLesson.isSuccess) return;
      submitLesson.mutate(state.submission);
  }, [state, submitLesson]);

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
