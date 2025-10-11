import { useExerciseState } from "../../Hooks/Exercises/useExerciseState";
import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import { TutorialHeader } from "./TutorialHeader";
import { TutorialFooter } from "./TutorialFooter";

export function TutorialPage() {
  const { currentExercise, exercises, currentPosition, userResponses, setAnswerAt, addAnswer, canSubmit, goToNextExercise } =
    useExerciseState();

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">

      <TutorialHeader total={exercises.length} position={currentPosition} />

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
