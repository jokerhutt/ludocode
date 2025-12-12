import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEMO_LOGIN } from "@/constants/api/pathConstants";
import type { QueryClient } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";

export const Route = createFileRoute("/demo/")({
  beforeLoad: async ({ context }) => {
    await demoAuthPreloader(context.queryClient);
  },
});

async function demoAuthPreloader(queryClient: QueryClient) {
  await fetch(DEMO_LOGIN, {
    method: "GET",
    credentials: "include",
  });
  await queryClient.invalidateQueries();
  await queryClient.ensureQueryData(qo.currentUser());

  throw redirect({ to: "/courses" });
}
