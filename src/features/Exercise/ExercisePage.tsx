import { ExerciseAnswerField } from "./ExerciseAnswerField";
import { ClickableOption } from "./ClickableOption";
import { SubmitButton } from "./SubmitButton";
import { useExerciseState } from "../../Hooks/Exercises/useExerciseState";
import { SegmentedProgress } from "./Progress/SegmentedProgress";

export function ExercisePage() {
  const { options, prompt, userResponses, setAnswerAt, addAnswer, canSubmit } =
    useExerciseState();

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <nav className="col-span-full grid grid-cols-12 min-h-16 bg-ludoGrayLight"> 

        <div className="flex h-full items-center justify-center col-start-1 col-end-12 lg:col-start-3 lg:col-end-11">
          <SegmentedProgress total={10} completed={5} />
        </div>

      </nav>

      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-1 lg:col-span-2" />

        <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
          <p className="text-white text-xl">
            Create a new variable called score and set its value to 1
          </p>
          <div className="w-full h-80 rounded-4xl bg-ludoGrayLight">
            <div className="w-full h-10 rounded-t-4xl bg-ludoYellow"></div>
            <div className="w-full h-full p-6">
              <ExerciseAnswerField
                options={options}
                prompt={prompt}
                userResponses={userResponses}
                setAnswerAt={setAnswerAt}
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-8">
            {options.map((option) => (
              <ClickableOption
                addSelection={addAnswer}
                option={option}
                userSelections={userResponses}
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2" />
      </main>

      <footer className="col-span-full grid grid-cols-12 min-h-24 bg-ludoGrayLight">
        <div className="flex w-full justify-between h-full py-2 items-center col-start-1 col-end-12 lg:col-start-3 lg:col-end-11">
          <div></div>
          <SubmitButton canSubmit={canSubmit} />
        </div>
      </footer>
    </div>
  );
}
