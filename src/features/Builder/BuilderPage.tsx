import { buildRoute } from "../../routes/router";
import { BuilderAsideModules } from "./BuilderAsideModules";
import { BuilderLessonContent } from "./BuilderLessonContent";
import { useState } from "react";
import type {
  LessonSnap,
  ModuleSnapshot,
} from "../../Types/Snapshot/SnapshotTypes";
import { BuilderExerciseColumn } from "./BuilderExerciseColumn";

type BuilderPageProps = {};

export function BuilderPage({}: BuilderPageProps) {
  const { courseId, moduleId } = buildRoute.useParams();
  const { snapshots } = buildRoute.useLoaderData();

  const modules: ModuleSnapshot[] = snapshots;

  const currentModule = modules.find((module) => module.moduleId == moduleId);
  const currentModuleLessons = currentModule!.lessons;

  const initialLesson = currentModuleLessons.find(
    (lesson) => lesson.orderIndex == 1
  );


  const [selectedLesson, setSelectedLesson] = useState<LessonSnap>(
    initialLesson!
  );
  const changeSelectedLesson = (lesson: LessonSnap) =>
    setSelectedLesson(lesson);

  return (
    <div className="grid grid-cols-12 bg-ludoGrayDark">
      <BuilderAsideModules
        modules={modules}
        moduleId={moduleId}
        courseId={courseId}
      />
      <BuilderLessonContent
        changeSelectedLesson={changeSelectedLesson}
        currentLesson={selectedLesson}
        lessons={currentModuleLessons}
        moduleId={moduleId}
      />

      <BuilderExerciseColumn currentLesson={selectedLesson} />
    </div>
  );
}
