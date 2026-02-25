import { ludoNavigation } from "@/constants/ludoNavigation";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
      <div className="col-span-1" />

      <div className="col-span-10 flex flex-col items-center justify-center relative px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            ease: "easeOut",
            scale: { type: "spring", stiffness: 200, damping: 15 },
          }}
          className="w-full max-w-xl"
        >
          <LudoCard
            shadow
            className="w-full max-w-xl flex flex-col items-center gap-8 p-10 text-center border border-ludo-border"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-ludo-accent/20 rounded-full" />
              <CheckCircle2 className="relative w-14 h-14 text-ludo-accent" />
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Subscription Activated
              </h1>

              <p className="text-ludo-accent-muted text-sm max-w-md">
                You now have full access to the{" "}
                <span className="text-white font-medium">{planCode}</span> plan.
                Your new limits and features are active immediately.
              </p>
            </div>

            <div className="w-full rounded-lg bg-ludo-background/60 border border-ludo-border px-6 py-4 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-ludo-accent-muted">
                Active Plan
              </span>
              <span className="text-lg font-semibold text-white">
                {planCode}
              </span>
            </div>

            <LudoButton
              variant="alt"
              shadow
              className="w-full max-w-xs mt-4"
              onClick={navigateToCurrentModule}
            >
              <span className="text-sm font-semibold">Continue Learning</span>
            </LudoButton>
          </LudoCard>
        </motion.div>
      </div>

      <div className="col-span-1" />
    </div>
  );
}
