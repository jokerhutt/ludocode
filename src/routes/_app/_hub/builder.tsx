import { BuilderHubPage } from "@/features/Hub/BuilderHub/BuilderHubPage";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { redirectToAuth } from "@/old-routes/redirects/redirects";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_hub/builder")({
  staticData: { headerTitle: "Builder " },
  loader: async ({ location, context }) =>
    builderHubLoader(location, context.queryClient),
  component: BuilderHubPage,
});

async function builderHubLoader(
  _location: { pathname: string },
  qc: QueryClient
) {
  const user = await qc.ensureQueryData(qo.currentUser());
  if (!user) redirectToAuth();

  await qc.ensureQueryData(qo.allCourses());
}

export async function builderPageLoader(
  params: { courseId: string },
  queryClient: QueryClient
) {
  const { courseId } = params;

  if (!courseId) redirectToAuth();

  await queryClient.ensureQueryData(qo.courseSnapshot(courseId));
}
