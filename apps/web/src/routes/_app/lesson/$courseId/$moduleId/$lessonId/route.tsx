import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { LessonLayout } from "./-components/LessonLayout";

export const Route = createFileRoute(
  "/_app/lesson/$courseId/$moduleId/$lessonId"
)({
  loader: async ({ params, context }) =>
    lessonPageLoader(params, context.queryClient),
  component: LessonLayout,
});

export async function lessonPageLoader(
  params: { courseId: string; lessonId: string },
  queryClient: QueryClient
) {
  const exercises = await queryClient.ensureQueryData(
    qo.exercises(params.lessonId)
  );
  const lesson = await queryClient.ensureQueryData(qo.lesson(params.lessonId));
  return { exercises, lesson };
}
