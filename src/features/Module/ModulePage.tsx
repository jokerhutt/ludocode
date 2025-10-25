import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { moduleRoute } from "../../routes/router";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import { ModuleAsideLeft } from "./ModuleAsideLeft";
import { ModuleAsideRight } from "./ModuleAsideRight";
import { PathButton } from "./PathButton";
import { PathRow } from "./PathRow";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import type {
  FlatLesson,
  FlatModule,
} from "../../Types/Catalog/FlatCourseTree";
import type { LudoModule } from "../../Types/Catalog/LudoModule";
import { useResetCourseProgress } from "../../Hooks/Queries/Mutations/useResetCourseProgress";

export function ModulePage() {
  const { courseId, moduleId } = moduleRoute.useParams();

  const { tree } = moduleRoute.useLoaderData();

  const { data: courseProgress } = useSuspenseQuery(
    qo.courseProgress(courseId)
  );

  const moduleMetaData: FlatModule = tree.modules.find(
    (module: FlatModule) => module.id == moduleId
  );

  const moduleQueries = useSuspenseQueries({
    queries: tree.modules.map((module: FlatModule) => qo.module(module.id)),
  });

  const lessonQueries = useSuspenseQueries({
    queries: moduleMetaData.lessons.map((lesson: FlatLesson) =>
      qo.lesson(lesson.id)
    ),
  });

  const modules = moduleQueries.map((moduleQuery) => moduleQuery.data);
  const lessons: LudoLesson[] = lessonQueries.map(
    (lessonQuery) => lessonQuery.data!
  );



  return (
    <div className="grid grid-cols-12 bg-ludoGrayDark">
      <ModuleAsideLeft />
      <div className="col-start-5 col-end-9 overflow-auto lg:col-start-6 lg:col-end-8 flex flex-col gap-10 lg:gap-8 items-center py-6 min-w-0">
        {lessons.map((lesson: LudoLesson, i: number) => (
          <PathRow key={lesson.id} index={i}>
            <PathButton
              isCurrent={lesson.id == courseProgress.currentLessonId}
              lesson={lesson}
            />
          </PathRow>
        ))}
      </div>
      <ModuleAsideRight modules={modules as LudoModule[]} courseId={courseId} />
    </div>
  );
}
