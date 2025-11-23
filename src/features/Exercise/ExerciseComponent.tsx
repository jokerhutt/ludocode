import type { AnswerToken } from "@/Hooks/Logic/Input/useInputAssistance";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import { AnalyzeExercise } from "./Templates/AnalyzeExercise";
import { ExercisePrompt } from "./UI/ExercisePrompt";
import { InfoExercise } from "./Templates/InfoExercise";
import { ClozeExercise } from "./Templates/ClozeExercise";
import { TriviaExercise } from "./Templates/TriviaExercise";
import { ExerciseMedia } from "./UI/ExerciseMedia";

type ExerciseComponentProps = {
  exercise: LudoExercise;
  userResponses: AnswerToken[];
  setAnswerAt: (index: number, value: AnswerToken) => void;
  addAnswer: (option: AnswerToken) => void;
};

export function ExerciseComponent({
  exercise,
  userResponses,
  setAnswerAt,
  addAnswer,
}: ExerciseComponentProps) {
  const exerciseBodyMap: any = {
    CLOZE: ClozeExercise,
    INFO: InfoExercise,
    ANALYZE: AnalyzeExercise,
    TRIVIA: TriviaExercise,
  };

  const ExerciseBody = exerciseBodyMap[exercise.exerciseType];

  return (
    <>
      <div className="col-span-1 lg:col-span-4" />

      <div className="col-span-10 lg:col-span-4 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
        <ExercisePrompt prompt={exercise.title} />
        {exercise.subtitle && <ExercisePrompt prompt={exercise.subtitle} />}

        {exercise.exerciseMedia && (
          <ExerciseMedia media={exercise.exerciseMedia} />
        )}

        <ExerciseBody
          options={[...exercise.correctOptions, ...exercise.distractors]}
          answerField={exercise.prompt}
          userResponses={userResponses}
          setAnswerAt={setAnswerAt}
          addSelection={addAnswer}
        />
      </div>

      <div className="col-span-1 lg:col-span-4" />
    </>
  );
}
