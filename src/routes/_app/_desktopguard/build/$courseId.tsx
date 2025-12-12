import { qo } from "@/hooks/Queries/Definitions/queries";
import { BuilderLayout } from "@/layouts/Builder/BuilderLayout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import {createFileRoute, redirect} from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_desktopguard/build/$courseId")({
  validateSearch: (s: Record<string, unknown>) => ({
    moduleId: typeof s.moduleId === "string" ? s.moduleId : undefined,
    lessonId: typeof s.lessonId === "string" ? s.lessonId : undefined,
    exerciseId: typeof s.exerciseId === "string" ? s.exerciseId : undefined,
  }),
  loader: async ({ params, context }) =>
    builderPageLoader(params, context.queryClient),
  component: BuilderLayout,
});

export async function builderPageLoader(
  params: { courseId: string },
  queryClient: QueryClient
) {
  const { courseId } = params;

  if (!courseId) throw redirect({to: "/auth", replace: true})

  await queryClient.ensureQueryData(qo.courseSnapshot(courseId));
}
