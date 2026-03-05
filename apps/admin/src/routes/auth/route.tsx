import { adminNavigation } from "@/constants/adminNavigation";
import { qo } from "@/queries/definitions/queries";
import { router } from "@/main";
import type { QueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: async ({ context }) => {
    await authPreloader(context.queryClient);
  },
});

async function authPreloader(queryClient: QueryClient) {
  const activeFeatures = await queryClient.ensureQueryData(qo.activeFeatures());
  if (activeFeatures.authMode !== "DEMO") {
    return;
  }
  await queryClient.invalidateQueries();
  await queryClient.ensureQueryData(qo.currentUser());
  router.navigate(adminNavigation.hub.courses.toCoursesHub());
}
