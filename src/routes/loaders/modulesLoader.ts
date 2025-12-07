import type { QueryClient } from "@tanstack/react-query";
import { ensureTreeData } from "../ensurers/ensureTreeData.ts";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";

export async function modulePageLoader(
  params: { courseId: string; moduleId: string },
  queryClient: QueryClient
) {
  const { courseId, moduleId } = params;

  const tree = await ensureTreeData(courseId, queryClient);
  const allCourses = await queryClient.ensureQueryData(qo.allCourses())
  return { tree, courseId, moduleId, allCourses };
}
