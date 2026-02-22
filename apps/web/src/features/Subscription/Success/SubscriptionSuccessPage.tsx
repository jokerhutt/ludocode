import { ludoNavigation } from "@/constants/ludoNavigation";
import { router } from "@/main";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect} from "react";
import { PropagateLoader } from "react-spinners";


export function SubscriptionSuccessPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await queryClient.invalidateQueries({
        queryKey: ["userSubscription"],
      });

      router.navigate(
        ludoNavigation.subscription.toSubscriptionConfirmedPage()
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [queryClient]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-2xl text-white">
          Syncing your subscription
        </h1>
        <PropagateLoader color="white" />
      </div>
    </div>
  );
}
