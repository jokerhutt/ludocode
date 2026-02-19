import { CheckoutAbortedPage } from "@/features/Subscription/Success/CheckoutAbortedPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/subscription/cancel")({
  component: CheckoutAbortedPage,
});
