import type { SubscriptionPlan } from "@ludocode/types";
import { XIcon } from "lucide-react";

type SubscriptionSuccessPageProps = {};

export function SubscriptionSuccessPage({}: SubscriptionSuccessPageProps) {
  const chosenPlan: SubscriptionPlan = "CORE";

  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-1 h-full" />
      <div className="flex flex-col items-center col-span-10 relative gap-8">
        <div className="absolute hover:cursor-pointer top-0 right-0">
          <XIcon className="text-ludoAltText" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome to Core!
          </h1>
          <p className="text-ludo-accent-muted text-sm lg:text-base max-w-md">
            Thank you for your support! You will now be able to access various
            features
          </p>
        </div>
      </div>
      <div className="col-span-1 h-full" />
    </div>
  );
}
