import { useSuspenseQuery } from "@tanstack/react-query";
import type {
  FlatCourseTree,
  FlatLesson,
  FlatModule,
} from "@ludocode/types/Catalog/FlatCourseTree.ts";
import { qo } from "@/queries/definitions/queries.ts";
import { useSuspenseDataArray } from "@/queries/util/useSuspenseDataArray.tsx";
import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";

export type ModuleProgress = {
  total: number;
  completed: number;
};

type Args = {
  tree: FlatCourseTree;
  courseId: string;
  moduleId: string;
};

export function useTreeData({ tree, courseId, moduleId }: Args) {
  const { data: courseProgress } = useSuspenseQuery(
    qo.courseProgress(courseId),
  );

  const moduleMetaData = tree.modules.find(
    (module: FlatModule) => module.id === moduleId,
  );

  if (!moduleMetaData) {
    throw new Error(`Module ${moduleId} not found in tree`);
  }

  const modules = useSuspenseDataArray(
    tree.modules.map((module: FlatModule) => qo.module(module.id)),
  );

  const lessons = useSuspenseDataArray(
    moduleMetaData!.lessons.map((lesson: FlatLesson) => qo.lesson(lesson.id)),
  );

  const allLessons = useSuspenseDataArray<LudoLesson>(
    tree.modules.flatMap((module: FlatModule) =>
      module.lessons.map((lesson: FlatLesson) => qo.lesson(lesson.id)),
    ),
  );

  const lessonMap = new Map(allLessons.map((l) => [l.id, l]));
  const moduleProgress = new Map<string, ModuleProgress>(
    tree.modules.map((m) => [
      m.id,
      {
        total: m.lessons.length,
        completed: m.lessons.filter((l) => lessonMap.get(l.id)?.isCompleted)
          .length,
      },
    ]),
  );

  return { courseProgress, modules, lessons, moduleProgress };
}
