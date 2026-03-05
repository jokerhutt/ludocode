import { qo } from "@/queries/definitions/queries.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location, context }) =>
    appPreloader(location, context.queryClient),
});

async function appPreloader(
  location: { pathname: string },
  queryClient: QueryClient,
) {
  await queryClient.ensureQueryData(qo.activeFeatures());

  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);
  if (!user) {
    throw redirect({ to: "/auth/login", replace: true });
  }

  const isOnboarding = location.pathname.startsWith("/onboarding");

  if (!isOnboarding && !user.hasOnboarded) {
    throw redirect({
      to: "/onboarding/$stage",
      params: { stage: "name" },
      replace: true,
    });
  }

  if (isOnboarding && user.hasOnboarded) {
    const courseId = await queryClient
      .ensureQueryData(qo.currentCourseId())
      .catch(() => null);

    if (courseId) {
      const progress = await queryClient
        .ensureQueryData(qo.courseProgress(courseId))
        .catch(() => null);

      if (progress) {
        throw redirect(
          ludoNavigation.hub.module.toModule(courseId, progress.moduleId, true),
        );
      }
    }

    throw redirect(ludoNavigation.courseRoot());
  }
}
