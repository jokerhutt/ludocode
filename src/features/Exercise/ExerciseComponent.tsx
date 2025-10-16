import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import { AnalyzeExercise } from "./AnalyzeExercise";
import { ClozeExercise } from "./ClozeExercise";
import { ExercisePrompt } from "./ExercisePrompt";
import { TriviaExercise } from "./TriviaExercise";

type ExerciseComponentProps = {
  exercise: LudoExercise;
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
  addAnswer: (option: string) => void;
};

export function ExerciseComponent({
  exercise,
  userResponses,
  setAnswerAt,
  addAnswer,
}: ExerciseComponentProps) {
  const exerciseBodyMap: any = {
    CLOZE: ClozeExercise,
    ANALYZE: AnalyzeExercise,
    TRIVIA: TriviaExercise,
  };

  const ExerciseBody = exerciseBodyMap[exercise.type];

  return (
    <main className="col-span-full grid grid-cols-12">
      <div className="col-span-1 lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
        <ExercisePrompt prompt={exercise.prompt} />

        <ExerciseBody
          options={exercise.options}
          answerField={exercise.answerField}
          userResponses={userResponses}
          setAnswerAt={setAnswerAt}
          addSelection={addAnswer}
        />
      </div>

      <div className="col-span-1 lg:col-span-2" />
    </main>
  );
}
