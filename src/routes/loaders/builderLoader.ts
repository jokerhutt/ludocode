import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { redirectToAuth } from "../redirects/redirects";

export async function builderHubLoader(
  _location: { pathname: string },
  qc: QueryClient
) {
  const user = await qc.ensureQueryData(qo.currentUser());
  if (!user) redirectToAuth();

  qc.ensureQueryData(qo.allCourses());
}

export async function builderPageLoader(
  params: { courseId: string },
  queryClient: QueryClient
) {
  const { courseId } = params;

  if (!courseId) redirectToAuth();

  await queryClient.ensureQueryData(qo.courseSnapshot(courseId));
}
