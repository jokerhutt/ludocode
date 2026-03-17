import { ExercisePage } from "@/features/lesson/ExercisePage.tsx";
import { GuidedExercisePage } from "@/features/lesson/GuidedExercisePage";
import { useLessonExercise } from "@/features/lesson/context/useLessonContext.tsx";

export function LessonPage() {
  const { currentExercise } = useLessonExercise();

  if (currentExercise.interaction?.type === "EXECUTABLE") {
    return <GuidedExercisePage />;
  }

  return <ExercisePage />;
}
