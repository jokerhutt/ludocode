import { createFileRoute, redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { api } from "@/constants/api/api";

export const Route = createFileRoute("/demo/")({
  beforeLoad: async ({ context }) => {
    await demoAuthPreloader(context.queryClient);
  },
});

async function demoAuthPreloader(queryClient: QueryClient) {
  if (!api.auth.demo) return;
  await fetch(api.auth.demo, {
    method: "GET",
    credentials: "include",
  });
  await queryClient.invalidateQueries();
  await queryClient.ensureQueryData(qo.currentUser());

  throw redirect({ to: "/courses" });
}
