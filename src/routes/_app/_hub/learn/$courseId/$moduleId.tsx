import {
  GET_LESSONS_FROM_IDS,
  GET_MODULES_FROM_IDS,
} from "@/constants/api/pathConstants";
import { parseIdsToRequestParam } from "@/hooks/Queries/Batcher/batcherFactory";
import { qk } from "@/hooks/Queries/Definitions/qk";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ModuleHubLayout } from "@/layouts/Hub/ModuleHubLayout";
import { useAppSession } from "@/routes/utils/session";
import type { FlatCourseTree } from "@/types/Catalog/FlatCourseTree";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const Route = createFileRoute("/_app/_hub/learn/$courseId/$moduleId")({
  staticData: { headerTitle: "Modules" },
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

  const moduleIds = tree.modules.map((m) => m.id);
  const lessonIds = tree.modules.flatMap((m) => m.lessons.map((l) => l.id));

  const missingModuleIds = moduleIds.filter(
    (id) => !queryClient.getQueryData(qk.module(id))
  );

  const missingLessonIds = lessonIds.filter(
    (id) => !queryClient.getQueryData(qk.lesson(id))
  );

  if (missingModuleIds.length) {
    const modules = await getModulesBulkFn({ data: missingModuleIds });
    modules.forEach((m) => queryClient.setQueryData(qk.module(m.id), m));
  }

  if (missingLessonIds.length) {
    const lessons = await getLessonIdsBulkFn({ data: missingLessonIds });
    lessons.forEach((l) => queryClient.setQueryData(qk.lesson(l.id), l));
  }

  return tree;
}

export const getModulesBulkFn = createServerFn({ method: "GET" })
  .inputValidator((ids: string[]) => ids)
  .handler(async ({ data: ids }) => {
    const session = await useAppSession();
    if (!session.data.id) throw new Response("Unauthorized", { status: 401 });

    const res = await fetch(
      GET_MODULES_FROM_IDS(parseIdsToRequestParam("moduleIds", ids)),
      { headers: { cookie: getRequestHeaders().get("cookie") ?? "" } }
    );

    if (!res.ok) throw new Error("Failed to fetch modules");
    return (await res.json()) as LudoModule[];
  });

export const getLessonIdsBulkFn = createServerFn({ method: "GET" })
  .inputValidator((ids: string[]) => ids)
  .handler(async ({ data: ids }) => {
    const session = await useAppSession();
    if (!session.data.id) throw new Response("Unauthorized", { status: 401 });

    const res = await fetch(
      GET_LESSONS_FROM_IDS(parseIdsToRequestParam("lessonIds", ids)),
      { headers: { cookie: getRequestHeaders().get("cookie") ?? "" } }
    );

    if (!res.ok) throw new Error("Failed to fetch lessons");
    return (await res.json()) as LudoModule[];
  });
