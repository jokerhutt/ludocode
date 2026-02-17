import { SubscriptionComparisonPage } from "@/features/Subscription/Comparison/SubscriptionComparisonPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subscription/comparison")({
  component: SubscriptionComparisonPage,
});
