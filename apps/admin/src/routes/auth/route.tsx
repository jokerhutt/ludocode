import { adminNavigation } from "@/constants/adminNavigation";
import { adminApi } from "@/constants/api/adminApi";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { router } from "@/main";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: async ({ context }) => {
    await demoAuthPreloader(context.queryClient);
  },
});

async function demoAuthPreloader(queryClient: QueryClient) {
  const activeFeatures = await queryClient.ensureQueryData(qo.activeFeatures());
  if (!activeFeatures.isDemoEnabled) {
    return;
  }
  if (!adminApi.auth.demo) return;
  await fetch(adminApi.auth.demo, {
    method: "GET",
    credentials: "include",
  });
  await queryClient.invalidateQueries();
  await queryClient.ensureQueryData(qo.currentUser());
  router.navigate(adminNavigation.hub.courses.toCoursesHub());
}
