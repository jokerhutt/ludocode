import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/queries/definitions/queries";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CheckoutAbortedPage() {
  const { data: currentCourseId } = useSuspenseQuery(qo.currentCourseId());
  const { data: currentCourseProgress } = useSuspenseQuery(
    qo.courseProgress(currentCourseId),
  );

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
      <div className="col-span-1" />
      <div className="col-span-10 flex flex-col items-center justify-center text-center gap-8 py-20">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-ludo-white-bright">
            Checkout Canceled
          </h1>

          <p className="text-sm lg:text-base text-ludo-accent-muted max-w-md">
            No worries. Your current plan remains unchanged. You can upgrade
            anytime.
          </p>
        </div>

        <div className="flex gap-4">
          <LudoButton
            className="px-4 w-auto"
            variant="white"
            onClick={() =>
              router.navigate(
                ludoNavigation.subscription.toSubscriptionComparisonPage(),
              )
            }
          >
            View Plans
          </LudoButton>

          <LudoButton
            variant="alt"
            className="px-4 w-auto"
            onClick={() => navigateToCurrentModule()}
          >
            Back to App
          </LudoButton>
        </div>
      </div>
      <div className="col-span-1" />
    </div>
  );
}
