import { useExerciseState } from "../../Hooks/Exercises/useExerciseState";
import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import { TutorialHeader } from "./TutorialHeader";
import { TutorialFooter } from "./TutorialFooter";
import { lessonRoute } from "../../routes/router";

export function TutorialPage() {
  const { lessonId } = lessonRoute.useParams();
  const { exercise } = lessonRoute.useSearch();
  const exercisePosition = Number(exercise);

  const {
    currentExercise,
    exercises,
    userResponses,
    setAnswerAt,
    addAnswer,
    canSubmit,
    goToNextExercise,
  } = useExerciseState({ exercisePosition, lessonId });

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <TutorialHeader total={exercises.length} position={exercisePosition} />

      <ExerciseComponent
        exercise={currentExercise}
        userResponses={userResponses}
        setAnswerAt={setAnswerAt}
        addAnswer={addAnswer}
      />

      <TutorialFooter submitAnswer={goToNextExercise} canSubmit={canSubmit} />
    </div>
  );
}
