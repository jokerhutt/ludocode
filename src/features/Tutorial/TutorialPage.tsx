import { useExerciseState } from "../../Hooks/Exercises/useExerciseState";
import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import { TutorialHeader } from "./TutorialHeader";
import { TutorialFooter } from "./TutorialFooter";

export function TutorialPage() {
  const { options, prompt, userResponses, setAnswerAt, addAnswer, canSubmit } =
    useExerciseState();

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <TutorialHeader userResponses={userResponses} />

      <ExerciseComponent
        options={options}
        prompt={prompt}
        userResponses={userResponses}
        setAnswerAt={setAnswerAt}
        addAnswer={addAnswer}
      />

      <TutorialFooter canSubmit={canSubmit} />
    </div>
  );
}
