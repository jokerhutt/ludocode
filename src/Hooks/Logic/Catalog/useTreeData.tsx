import { useSuspenseQuery } from "@tanstack/react-query";
import type {
  FlatCourseTree,
  FlatLesson,
  FlatModule,
} from "../../../Types/Catalog/FlatCourseTree";
import { qo } from "../../Queries/Definitions/queries";
import { useSuspenseDataArray } from "@/Hooks/Queries/Util/useSuspenseDataArray";

type Args = {
  tree: FlatCourseTree;
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

  const modules = useSuspenseDataArray(
    tree.modules.map((module: FlatModule) => qo.module(module.id))
  );

  const lessons = useSuspenseDataArray(
    moduleMetaData!.lessons.map((lesson: FlatLesson) => qo.lesson(lesson.id))
  );

  return { courseProgress, modules, lessons };
}
