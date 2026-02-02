import { qo } from "@/hooks/Queries/Definitions/queries";
import { ProfileHubLayout } from "@/layouts/Hub/ProfileHubLayout";
import type { LudoCourse } from "@ludocode/types";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/profile/$userId")({
  staticData: { headerTitle: "Profile" },
  loader: async ({ context }) => profileLoader(context.queryClient),
  component: ProfileHubLayout,
});

async function profileLoader(queryClient: QueryClient) {
  await queryClient.ensureQueryData(qo.allCourses());

  await queryClient.ensureQueryData(qo.currentCourseId());
  const allCourses: LudoCourse[] = await queryClient.ensureQueryData(
    qo.allCourses(),
  );

  const allCourseIds = allCourses.map((course) => course.id);
  await Promise.all(
    allCourseIds.map((courseId) =>
      queryClient.ensureQueryData(qo.courseStats(courseId)),
    ),
  );
}
