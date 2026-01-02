import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/build/$courseId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/build/$courseId"!</div>;
}

export async function builderPageLoader(
  params: { courseId: string },
  queryClient: QueryClient
) {
  const { courseId } = params;

  if (!courseId) throw redirect({ to: "/auth", replace: true });

  await queryClient.ensureQueryData(qo.courseSnapshot(courseId));
}
