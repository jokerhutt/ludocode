import { SubscriptionOverviewCard } from "./Components/SubscriptionOverviewCard";
import { subscriptionTiers } from "./content";

export function SubscriptionComparisonPage() {
  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-1 h-full" />
      <div className="flex flex-col items-center col-span-10 gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Choose Your Plan
          </h1>
          <p className="text-ludo-accent-muted text-sm lg:text-base max-w-md">
            Level up your coding journey with the plan that fits your goals.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-center gap-5 items-stretch max-w-4xl">
          {subscriptionTiers.map((plan) => (
            <SubscriptionOverviewCard plan={plan}/>
          ))}
        </div>
      </div>
      <div className="col-span-1 h-full" />
    </div>
  );
}
