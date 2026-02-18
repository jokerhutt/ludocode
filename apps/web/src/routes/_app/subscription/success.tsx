import { SubscriptionSuccessPage } from "@/features/Subscription/Success/SubscriptionSuccessPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subscription/success")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      session_id:
        typeof search.session_id === "string" ? search.session_id : undefined,
    };
  },
  component: SubscriptionSuccessPage,
});
