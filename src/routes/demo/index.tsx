import { createFileRoute, redirect } from "@tanstack/react-router";
import { AUTH_ME, DEMO_LOGIN } from "@/constants/api/pathConstants";
import { type QueryClient } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { useAppSession } from "../utils/session";
import type { LudoUser } from "@/types/User/LudoUser";

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

export const demoAuthFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    const res = await fetch(AUTH_ME, { headers: { cookie } });
    if (!res.ok) return null;
    const user: LudoUser = await res.json();

    const session = await useAppSession();

    await session.update(user);
  }
);
