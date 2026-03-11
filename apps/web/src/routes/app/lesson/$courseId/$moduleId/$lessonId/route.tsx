import { qo } from "@/queries/definitions/queries.ts";
import { LessonLayout } from "@/layouts/lesson/LessonLayout.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/app/lesson/$courseId/$moduleId/$lessonId"
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
