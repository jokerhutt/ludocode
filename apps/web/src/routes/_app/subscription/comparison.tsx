import { SubscriptionComparisonPage } from "@/features/Subscription/SubscriptionComparisonPage";
import { SubscriptionLayout } from "@/layouts/Subscription/SubscriptionLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subscription/comparison")({
  component: SubscriptionComparisonPage,
});
