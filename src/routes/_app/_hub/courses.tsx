import { CoursePage } from "@/features/Hub/CourseHub/CoursePage";
import { qo } from "@/hooks/Queries/Definitions/queries";
import type { LudoUser } from "@/types/User/LudoUser";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/courses")({
  staticData: { headerTitle: "Courses" },
  loader: async ({ context }) => coursesLoader(context.queryClient),
  component: CoursePage,
});

async function coursesLoader(queryClient: QueryClient) {
  const currentUser: LudoUser = await queryClient.ensureQueryData(
    qo.currentUser()
  );
  const allCourses = await queryClient.ensureQueryData(qo.allCourses());
  const enrolled: string[] = await queryClient.ensureQueryData(qo.enrolled());

  await Promise.all(
    enrolled.map((enrolledId) =>
      queryClient.ensureQueryData(qo.courseProgress(enrolledId))
    )
  );

  return { allCourses, enrolled, currentUser };
}
