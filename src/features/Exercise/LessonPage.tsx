import { AnalyzeExercise } from "./Templates/AnalyzeExercise";
import { ExercisePrompt } from "./UI/ExercisePrompt";
import { InfoExercise } from "./Templates/InfoExercise";
import { ClozeExercise } from "./Templates/ClozeExercise";
import { TriviaExercise } from "./Templates/TriviaExercise";
import { ExerciseMedia } from "./UI/ExerciseMedia";
import { FloatingChatBotWindow } from "@/components/Molecules/Chatbot/FloatingChatBotWindow";
import { useLessonContext } from "../Lesson/useLessonContext";

export function LessonPage() {
  const exerciseBodyMap: any = {
    CLOZE: ClozeExercise,
    INFO: InfoExercise,
    ANALYZE: AnalyzeExercise,
    TRIVIA: TriviaExercise,
  };

  const { inputState, currentExercise } = useLessonContext();
  const {
    currentExerciseInputs,
    setAnswerAt: addClickedAnswer,
    replaceAnswerAt: addKeyboardAnswer,
  } = inputState;

  const ExerciseBody = exerciseBodyMap[currentExercise.exerciseType];

  return (
    <>
      <div className="col-span-0 hidden lg:block lg:col-span-4 h-full min-h-0">
        <FloatingChatBotWindow
          chatType="LESSON"
          targetId={currentExercise.id ?? null}
          outerClassName="pl-6 pr-30"
        />
      </div>

      {currentExercise && (
        <div className="col-span-full px-8 lg:px-0 lg:col-span-4 flex flex-col gap-8 py-8 items-stretch justify-center h-full min-w-0">
          <ExercisePrompt prompt={currentExercise.title} />
          {currentExercise.subtitle && (
            <ExercisePrompt prompt={currentExercise.subtitle} />
          )}

          {currentExercise.exerciseMedia && (
            <ExerciseMedia media={currentExercise.exerciseMedia} />
          )}

          <ExerciseBody
            options={[
              ...currentExercise.correctOptions,
              ...currentExercise.distractors,
            ]}
            answerField={currentExercise.prompt}
            userResponses={currentExerciseInputs}
            setAnswerAt={addKeyboardAnswer}
            addSelection={addClickedAnswer}
          />
        </div>
      )}

      <div className="col-span-0 lg:col-span-4" />
    </>
  );
}
