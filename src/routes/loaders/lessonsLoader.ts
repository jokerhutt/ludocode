import type { QueryClient } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";

export async function lessonPageLoader(
  params: { courseId: string; lessonId: string },
  queryClient: QueryClient
) {
    const exercises = await queryClient.ensureQueryData(
      qo.exercises(params.lessonId)
    );
    const lesson = await queryClient.ensureQueryData(
      qo.lesson(params.lessonId)
    );
    return { exercises, lesson };
}
