import { useLocation } from "@tanstack/react-router";
import type { LessonSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import type { SyncState } from "../../../routes/Packets/SyncState";
import { useSubmitLesson } from "../../../Hooks/Queries/Mutations/useSubmitLesson";
import { useEffect } from "react";
import { ClipLoader, PropagateLoader } from "react-spinners";

type SyncingPageProps = {};

function isSyncState(s: any): s is SyncState {
  return s && typeof s === "object" && "submission" in s;
}

export function SyncingPage({}: SyncingPageProps) {
    
  const { state } = useLocation();
  if (!isSyncState(state)) throw new Error("Missing submission");
  const { submission } = state;

  const submitLessonMutation = useSubmitLesson();

  useEffect(() => {
    submitLessonMutation.mutate(submission);
  }, []);

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
