import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { router } from "@/main";
import { useSuspenseQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";

export function SubscriptionConfirmPage() {
  const { data: subscription } = useSuspenseQuery(qo.subscription());
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

  const { planCode } = subscription;

  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className="col-span-1 h-full" />
      <div className="flex flex-col items-center col-span-10 relative gap-8">
        <div className="absolute hover:cursor-pointer top-0 right-0">
          <XIcon onClick={() => navigateToCurrentModule()} className="text-ludoAltText" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome to {planCode}!
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
