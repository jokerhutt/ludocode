import { ClickableOption } from "./ClickableOption";
import { ExerciseAnswerField } from "./ExerciseAnswerField";

type ExerciseComponentProps = {

    options: string[];
    prompt: string;
    userResponses: string[];
    setAnswerAt: (index: number, value: string) => void;
    addAnswer: (option: string) => void;

}

export function ExerciseComponent ({options, prompt, userResponses, setAnswerAt, addAnswer}: ExerciseComponentProps) {

    return (

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

    )


}