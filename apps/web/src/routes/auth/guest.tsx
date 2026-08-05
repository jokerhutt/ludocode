import { loginAsGuest } from "@/queries/mutations/session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/guest")({
  beforeLoad: async ({ context }) => {
    const navigation = await loginAsGuest(context.queryClient);

    throw redirect(navigation);
  },
  component: () => null,
});
