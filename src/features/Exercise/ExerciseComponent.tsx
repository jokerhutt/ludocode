import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import type { LudoExerciseOption } from "../../Types/Exercise/LudoExerciseOption";
import { ClickableOption } from "./ClickableOption";
import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { ExerciseCodeContainer } from "./ExerciseCodeContainer";
import { ExercisePrompt } from "./ExercisePrompt";

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
  const { options, answerField, prompt } = exercise;

  return (
    <main className="col-span-full grid grid-cols-12">
      <div className="col-span-1 lg:col-span-2" />

      <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
        <ExercisePrompt prompt={prompt} />
        
        <ExerciseCodeContainer>
          <ExerciseAnswerField
            options={options}
            answerField={answerField}
            userResponses={userResponses}
            setAnswerAt={setAnswerAt}
          />
        </ExerciseCodeContainer>

        <div className="w-full flex justify-center items-center gap-8">
          {options.map((option) => (
            <ClickableOption
              addSelection={addAnswer}
              option={option.content}
              userSelections={userResponses}
            />
          ))}
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2" />
    </main>
  );
}
