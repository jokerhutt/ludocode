import { useState } from "react";
import { AsideComponent } from "../../Layouts/Aside/AsideComponent";
import { ModuleAsideRight } from "../Module/ModuleAsideRight";
import { mockLessons, mockModules } from "../../Types/mockData/mockExercises";
import type { LudoTutorial } from "../../Types/Exercise/LudoTutorial";
import { BuilderLessonContainer } from "./BuilderLessonContainer";
import { BuilderCreatorContainer } from "./BuilderCreatorContainer";

type PracticePageProps = {};

export function BuilderPage({}: PracticePageProps) {
  const [courseModules, setCourseModules] = useState(mockModules);

  const currentModule = courseModules[0];

  const [currentLesson, setCurrentLesson] = useState(mockLessons[0]);

  return (
    <div className="grid col-span-full grid-cols-12">
      <AsideComponent orientation="LEFT">
        <BuilderLessonContainer currentLesson={currentLesson} currentModule={currentModule} moduleLessons={mockLessons}/>
      </AsideComponent>

      <div className="col-start-5 col-end-9 flex flex-col gap-8 p-6 items-stretch justify-start h-full min-w-0">
        <BuilderCreatorContainer currentLesson={currentLesson}/>
      </div>

      <ModuleAsideRight />
    </div>
  );
}
