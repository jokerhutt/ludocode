import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/queries/definitions/queries";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/subscription/_subscribedguard")({
  beforeLoad: async ({ context }) => {
    const currentSubscription = await context.queryClient.ensureQueryData(
      qo.subscription(),
    );

    if (currentSubscription.planCode == "DEV") {
        throw redirect(ludoNavigation.app.index())
    }

    if (currentSubscription.planCode != "FREE") {
      throw redirect(ludoNavigation.subscription.toAlreadySubscribedPage());
    }
  },
});
