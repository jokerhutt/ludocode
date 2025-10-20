import type { LudoTutorial } from "../../Types/Exercise/LudoTutorial";
import { mockExercises } from "../../Types/mockData/mockExercises";

type BuilderCreatorContainerProps = {currentLesson: LudoTutorial};

export function BuilderCreatorContainer({currentLesson}: BuilderCreatorContainerProps) {

  const lessonExercises = mockExercises;

  


  return (
    <div className="border rounded-xl flex flex-col py-4">
        <div className="flex justify-center items-center text-white">
            <input value={currentLesson.title}/>
        </div>
    </div>
  );
}