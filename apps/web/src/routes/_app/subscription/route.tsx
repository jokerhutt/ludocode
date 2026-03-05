import { SubscriptionLayout } from "@/layouts/subscription/SubscriptionLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subscription")({
  component: SubscriptionLayout,
});
