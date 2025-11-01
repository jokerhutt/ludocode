import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import type { FlatCourseTree, FlatLesson, FlatModule } from "../../../Types/Catalog/FlatCourseTree";
import { qo } from "../../Queries/Definitions/queries";
import type { LudoLesson } from "../../../Types/Catalog/LudoLesson";

type Args = { 
    tree: FlatCourseTree
    courseId: string;
    moduleId: string;
 };

export function useTreeData({ tree, courseId, moduleId }: Args) {

  const { data: courseProgress } = useSuspenseQuery(
    qo.courseProgress(courseId)
  );

  const moduleMetaData = tree.modules.find(
    (module: FlatModule) => module.id == moduleId
  );

  const moduleQueries = useSuspenseQueries({
    queries: tree.modules.map((module: FlatModule) => qo.module(module.id)),
  });

  console.log(JSON.stringify(moduleMetaData))

  const lessonQueries = useSuspenseQueries({
    queries: moduleMetaData!.lessons.map((lesson: FlatLesson) =>
      qo.lesson(lesson.id)
    ),
  });

  console.log(JSON.stringify(lessonQueries))

  const modules = moduleQueries.map((moduleQuery) => moduleQuery.data);
  const lessons: LudoLesson[] = lessonQueries.map(
    (lessonQuery) => lessonQuery.data!
  );

  return {courseProgress, modules, lessons}

}
