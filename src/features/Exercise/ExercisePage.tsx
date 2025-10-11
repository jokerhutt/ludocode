import { useState } from "react";
import { ExercisePrompt } from "./AnswerField";
import { PotentialOptionButton } from "./PotentialOptionButton";

export function ExercisePage() {
  const options = ["let", "=", "1"];
  const prompt = "___ score ___ ___";

  const [userAnswer, setUserAnswer] = useState<string[]>(["", "", ""]);
  const answerSlots = 3;

  const setAnswerAt = (index: number, value: string) => {
    setUserAnswer((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addAnswer = (value: string) => {
  setUserAnswer(prev => {
    const tempArray = [...prev];
    const firstSlot = tempArray.findIndex(slot => slot === "");
    if (firstSlot === -1) return tempArray;
    tempArray[firstSlot] = value;
    return tempArray;
  });

  }

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_1fr_auto] min-h-screen">
      <nav className="col-span-full flex min-h-16 bg-ludoGrayLight" />

      <main className="col-span-full grid grid-cols-12">
        <div className="col-span-1 lg:col-span-2" />

        <div className="col-span-10 lg:col-span-8 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
          <p className="text-white text-xl">
            Create a new variable called score and set its value to 1
          </p>
          <div className="w-full h-80 rounded-4xl bg-ludoGrayLight">
            <div className="w-full h-10 rounded-t-4xl bg-ludoYellow"></div>
            <div className="w-full h-full p-6">
              <ExercisePrompt prompt={prompt} userAnswer={userAnswer} setAnswerAt={setAnswerAt}/>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-8">
            {options.map((option) => (
                <PotentialOptionButton addSelection={addAnswer} option={option} userSelections={userAnswer}/>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2" />
      </main>

      <footer className="col-span-full grid grid-cols-12 min-h-24 bg-ludoGrayLight">
        <div className="flex w-full justify-between h-full py-2 items-center col-start-1 col-end-12 lg:col-start-3 lg:col-end-11">
          <div></div>
          <div className="border py-2 px-4 rounded-xl border-ludoYellow">
            <p className="text-ludoYellow text-2xl">Submit ⌘+⏎</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
