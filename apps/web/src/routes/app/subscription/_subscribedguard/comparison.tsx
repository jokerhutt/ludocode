import { SubscriptionComparisonPage } from "@/features/subscription/comparison/SubscriptionComparisonPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/subscription/_subscribedguard/comparison")({
  component: SubscriptionComparisonPage,
});
