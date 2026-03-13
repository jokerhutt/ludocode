import { ExercisePage } from "@/features/lesson/ExercisePage.tsx";
import { GuidedExercisePage } from "@/features/lesson/guided/GuidedExercisePage";
import { useLessonContext } from "@/features/lesson/context/useLessonContext.tsx";

export function LessonPage() {
  const { currentExercise } = useLessonContext();

  if (currentExercise.interaction?.type === "EXECUTABLE") {
    return <GuidedExercisePage />;
  }

  return <ExercisePage />;
}
