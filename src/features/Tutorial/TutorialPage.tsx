import { useExerciseState } from "../../Hooks/Exercises/useExerciseState";
import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import { TutorialHeader } from "./TutorialHeader";
import { TutorialFooter } from "./TutorialFooter";
import { tutorialRoute } from "../../routes/router";

export function TutorialPage() {
  const { tutorialId, position } = tutorialRoute.useParams();
  const exercisePosition = Number(position);

  const {
    currentExercise,
    exercises,
    userResponses,
    setAnswerAt,
    addAnswer,
    canSubmit,
    goToNextExercise,
  } = useExerciseState({ exercisePosition, tutorialId });

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
