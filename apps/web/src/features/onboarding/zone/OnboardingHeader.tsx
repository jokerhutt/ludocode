import { Progress } from "@ludocode/external/ui/progress.tsx";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { useOnboardingContext } from "@/features/onboarding/context/OnboardingContext.tsx";

type OnboardingHeaderProps = {
  total: number;
  position: number;
};

export function OnboardingHeader({ total, position }: OnboardingHeaderProps) {
  const completed = position + 1;
  const { flow } = useOnboardingContext();
  const { showBack, prev } = flow;

  return (
    <LudoHeader>
      <LudoHeader.Shell className="px-4" device="Both">
        <div className="col-start-1 col-end-2 flex items-center h-full">
          {showBack && (
            <IconButton
              onClick={prev}
              variant="default"
              iconName="ArrowLeftIcon"
            />
          )}
        </div>
        <div className="flex items-center justify-center gap-3 col-start-3 col-end-11 lg:col-start-4 lg:col-end-10">
          <Progress
            className="border border-ludo-border h-3 bg-ludo-background/60"
            value={(completed / total) * 100}
          />
          <span className="text-[11px] text-ludo-accent-muted tabular-nums whitespace-nowrap font-medium">
            {completed}/{total}
          </span>
        </div>
      </LudoHeader.Shell>
    </LudoHeader>
  );
}
