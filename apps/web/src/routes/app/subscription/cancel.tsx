import { CheckoutAbortedPage } from "@/features/subscription/checkout/CheckoutAbortedPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/subscription/cancel")({
  component: CheckoutAbortedPage,
});
