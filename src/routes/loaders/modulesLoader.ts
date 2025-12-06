import type { QueryClient } from "@tanstack/react-query";
import { ensureTreeData } from "../ensurers/ensureTreeData.ts";

export async function modulePageLoader(
  params: { courseId: string; moduleId: string },
  queryClient: QueryClient
) {
  const { courseId, moduleId } = params;

  const tree = await ensureTreeData(courseId, queryClient);
  return { tree, courseId, moduleId };
}
