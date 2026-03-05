import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/queries/definitions/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: async ({ context }) => {
    console.log("Before load");

    let user = null;

    try {
      console.log("Getting user");
      user = await context.queryClient.ensureQueryData(qo.currentUser());
    } catch (error) {
      return;
    }

    if (user) {
      console.log("Redirecting authenticated user");
      throw redirect(ludoNavigation.app.index());
    }
  },
});
