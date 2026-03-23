import { qo } from "@/queries/definitions/queries";
import { useEditPreferences } from "@/queries/mutations/useEditPreferences";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLessonExercise } from "../context/useLessonContext";
import { useState } from "react";
import { ExerciseFeedbackIcon } from "../components/ExerciseFeedbackIcon";
import { AudioToggleIcon } from "../components/AudioToggleIcon";
import { FeedbackDialog } from "@/features/feedback/FeedbackDialog";

export function LessonActionsDesktop() {
  const { data: preferences } = useSuspenseQuery(qo.preferences());
  const editPreferences = useEditPreferences();
  const { currentExercise } = useLessonExercise();
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const toggleAudio = () => {
    if (editPreferences.isPending) return;
    editPreferences.mutate({
      key: "AUDIO",
      value: !preferences.audioEnabled,
    });
  };

  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
      <button
        type="button"
        onClick={() => setFeedbackOpen(true)}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-ludo-white-dim hover:text-ludo-white hover:bg-ludo-surface hover:cursor-pointer"
      >
        <ExerciseFeedbackIcon />
        <span>Feedback</span>
      </button>

      <button
        type="button"
        onClick={toggleAudio}
        disabled={editPreferences.isPending}
        className="flex items-center gap-1 rounded-md px-2 py-1 text-ludo-white-dim hover:text-ludo-white hover:bg-ludo-surface hover:cursor-pointer disabled:opacity-60"
      >
        <AudioToggleIcon audioEnabled={preferences.audioEnabled} />
        <span>Audio</span>
      </button>

      <FeedbackDialog
        feedbackType={"EXERCISE"}
        entityId={currentExercise.id}
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
      />
    </div>
  );
}
