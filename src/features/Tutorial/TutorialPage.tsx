import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import { useLessonContext } from "./useLessonContext";

export function TutorialPage() {
  const { bufferState, currentExercise } = useLessonContext();

  const { buffer, addAnswer, replaceAnswer } = bufferState;

  return (
    <div className="grid col-span-full grid-cols-12">
      <ExerciseComponent
        exercise={currentExercise}
        userResponses={buffer}
        setAnswerAt={replaceAnswer}
        addAnswer={addAnswer}
      />
    </div>
  );
}
