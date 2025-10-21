import type { QueryClient } from "@tanstack/react-query";
import type { FlatCourseTree } from "../Types/Catalog/FlatCourseTree";
import { qo } from "../Hooks/Queries/queries";
import { qk } from "../constants/qk";
import type { LudoUser } from "../Types/User/LudoUser";

export async function ensureTreeData(
  courseId: string,
  queryClient: QueryClient
) {
  const tree: FlatCourseTree = await queryClient.ensureQueryData(qo.courseTree(courseId));

  await Promise.all([
    ...tree.modules.map((m) => queryClient.ensureQueryData(qo.module(m.id))),
    ...tree.modules.flatMap((m) =>
      m.lessons.map((l) => queryClient.ensureQueryData(qo.lesson(l.id)))
    ),
  ]);

  return tree

}