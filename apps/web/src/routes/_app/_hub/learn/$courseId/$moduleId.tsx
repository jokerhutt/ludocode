import { qo } from "@/queries/definitions/queries.ts";
import { ModuleHubLayout } from "@/layouts/Hub/ModuleHubLayout.tsx";
import type { FlatCourseTree } from "@ludocode/types/Catalog/FlatCourseTree.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/learn/$courseId/$moduleId")({
  staticData: { headerTitle: "modules" },
  loader: async ({ params, context }) =>
    modulePageLoader(params, context.queryClient),
  component: ModuleHubLayout,
});

async function modulePageLoader(
  params: { courseId: string; moduleId: string },
  queryClient: QueryClient
) {
  const { courseId, moduleId } = params;

  const tree = await ensureTreeData(courseId, queryClient);
  const allCourses = await queryClient.ensureQueryData(qo.allCourses());
  return { tree, courseId, moduleId, allCourses };
}

async function ensureTreeData(courseId: string, queryClient: QueryClient) {
  const tree: FlatCourseTree = await queryClient.ensureQueryData(
    qo.courseTree(courseId)
  );

  await Promise.all([
    ...tree.modules.map((m) => queryClient.ensureQueryData(qo.module(m.id))),
    ...tree.modules.flatMap((m) =>
      m.lessons.map((l) => queryClient.ensureQueryData(qo.lesson(l.id)))
    ),
  ]);

  return tree;
}
