import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useStripeManage } from "@/hooks/Queries/Mutations/useStripeManage";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { useSuspenseQuery } from "@tanstack/react-query";

type AlreadySubscribedPageProps = {};

export function AlreadySubscribedPage({}: AlreadySubscribedPageProps) {
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

  const { openManagePortal } = useStripeManage();

  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-1" />
      <div className="col-span-10 flex flex-col items-center justify-center text-center gap-8 py-20">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Already subscribed!
          </h1>

          <p className="text-sm lg:text-base text-ludo-accent-muted max-w-md">
            Looks like you're already subscribed!
          </p>
        </div>

        <div className="flex gap-4">
          <LudoButton
            variant="alt"
            className="px-4 w-auto"
            onClick={() => navigateToCurrentModule()}
          >
            Back to App
          </LudoButton>
          <LudoButton
            className="px-4 w-auto"
            variant="white"
            onClick={() => openManagePortal()}
          >
            Manage Plan
          </LudoButton>
        </div>
      </div>
      <div className="col-span-1" />
    </div>
  );
}
