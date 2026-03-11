import { CoursePage } from "@/features/course/hub/CoursePage.tsx";
import { qo } from "@/queries/definitions/queries.ts";
import type { LudoUser } from "@ludocode/types/User/LudoUser.ts";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/_hub/courses")({
  staticData: { headerTitle: "Catalog" },
  loader: async ({ context }) => coursesLoader(context.queryClient),
  component: CoursePage,
});

async function coursesLoader(queryClient: QueryClient) {
  const currentUser: LudoUser = await queryClient.ensureQueryData(
    qo.currentUser(),
  );
  const allCourses = await queryClient.ensureQueryData(qo.allCourses());
  const enrolled: string[] = await queryClient.ensureQueryData(qo.enrolled());

  const enrolledSet = new Set(enrolled);

  const availableCourses = allCourses.filter(
    (course) =>
      course.courseStatus === "PUBLISHED" ||
      (course.courseStatus === "ARCHIVED" && enrolledSet.has(course.id)),
  );

  await Promise.all(
    enrolled.flatMap((id) => [
      queryClient.ensureQueryData(qo.courseProgress(id)),
      queryClient.ensureQueryData(qo.courseStats(id)),
    ]),
  );

  return { availableCourses, enrolled, currentUser };
}
