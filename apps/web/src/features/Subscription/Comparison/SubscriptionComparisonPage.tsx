import { XIcon } from "lucide-react";
import { SubscriptionOverviewCard } from "./Components/SubscriptionOverviewCard";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";

export function SubscriptionComparisonPage() {
  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());
  const { data: currentCourseProgress } = useSuspenseQuery(
    qo.courseProgress(currentCourseId),
  );

  const { data: plans } = useSuspenseQuery(qo.plans());
  const { data: currentPlan } = useSuspenseQuery(qo.subscription());

  const navigateToCurrentModule = () => {
    router.navigate(
      ludoNavigation.hub.module.toModule(
        currentCourseProgress.courseId,
        currentCourseProgress.moduleId,
      ),
    );
  };

  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-1 h-full" />
      <div className="flex flex-col items-center min-h-0 overflow-y-auto pb-6 col-span-10 relative gap-8">
        <div className="absolute hover:cursor-pointer top-1 right-0">
          <XIcon
            onClick={() => navigateToCurrentModule()}
            className="text-ludo-white"
          />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-ludo-white-bright">
            Choose Your Plan
          </h1>
          <p className="text-ludo-accent-muted text-sm lg:text-base max-w-md">
            Level up your coding journey with the plan that fits your goals.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-center gap-6 lg:gap-5 items-stretch max-w-4xl">
          {plans.map((plan) => (
            <SubscriptionOverviewCard
              navToCurrent={navigateToCurrentModule}
              current={currentPlan.planCode}
              plan={plan}
            />
          ))}
        </div>
      </div>
      <div className="col-span-1 h-full" />
    </div>
  );
}
