import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import { useLessonContext } from "./useLessonContext";

export function TutorialPage() {

  const {
    currentExercise,
    userResponses,
    setAnswerAt,
    addAnswer,
  } = useLessonContext();

  return (
    <div className="grid col-span-full grid-cols-12">
      <ExerciseComponent
        exercise={currentExercise}
        userResponses={userResponses}
        setAnswerAt={setAnswerAt}
        addAnswer={addAnswer}
      />
    </div>
  );
}
