import { FeedbackDialog } from "@/features/feedback/FeedbackDialog.tsx";
import { useLessonContext } from "@/features/lesson/context/useLessonContext.tsx";
import { Flag } from "lucide-react";

export function ExerciseFeedbackIcon() {
  const { currentExercise } = useLessonContext();

  return (
    <FeedbackDialog feedbackType={"EXERCISE"} entityId={currentExercise.id}>
      <button
        type="button"
        aria-label="Report exercise feedback"
        className="text-ludo-white hover:cursor-pointer"
      >
        <Flag className="w-5 h-5" strokeWidth={1} />
      </button>
    </FeedbackDialog>
  );
}
