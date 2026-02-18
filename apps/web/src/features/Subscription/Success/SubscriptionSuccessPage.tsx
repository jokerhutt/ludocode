import { ludoNavigation } from "@/constants/ludoNavigation";
import { useSubmitCheckoutConfirmation } from "@/hooks/Queries/Mutations/useSubmitCheckoutConfirmation";
import { router } from "@/main";
import { useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { PropagateLoader } from "react-spinners";

type SubscriptionSuccessPageProps = {};

export function SubscriptionSuccessPage({}: SubscriptionSuccessPageProps) {
  const search = useSearch({ from: "/_app/subscription/success" });
  const sessionId = search.session_id;

  const confirmMutation = useSubmitCheckoutConfirmation();

  useEffect(() => {
    if (!sessionId) {
      router.navigate({ to: "/subscription" });
      return;
    }

    if (confirmMutation.isPending || confirmMutation.isSuccess) {
      return;
    }

    confirmMutation.mutate(
      { sessionId },
      {
        onSuccess: () => {
          router.navigate(
            ludoNavigation.subscription.toSubscriptionConfirmedPage(),
          );
        },
        onError: () => {
          router.navigate({ to: "/subscription" });
        },
      },
    );
  }, [sessionId, confirmMutation]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl text-white">Syncing your subscription</h1>
        <PropagateLoader color="white" />
      </div>
    </div>
  );
}
