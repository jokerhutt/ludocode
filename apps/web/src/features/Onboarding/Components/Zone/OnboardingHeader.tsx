import { Progress } from "@ludocode/external/ui/progress.tsx";
import { IconButton } from "@ludocode/design-system/primitives/icon-button.tsx";
import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell.tsx";
import { useOnboardingContext } from "../../Context/OnboardingContext";

type OnboardingHeaderProps = {
  total: number;
  position: number;
};

export function OnboardingHeader({ total, position }: OnboardingHeaderProps) {
  const completed = position + 1;
  const { flow } = useOnboardingContext();
  const { showBack, prev } = flow;

  return (
    <HeaderWithBar className="px-4" device="Both">
      <div className="col-start-1 col-end-2 flex items-center h-full">
        {showBack && (
          <IconButton
            onClick={prev}
            variant="default"
            iconName="ArrowLeftIcon"
          />
        )}
      </div>
      <div className="flex items-center justify-center col-start-3 col-end-11 lg:col-start-4 lg:col-end-10">
        <Progress
          className="border-ludo-accent-muted h-3"
          value={(completed / total) * 100}
        />
      </div>
    </HeaderWithBar>
  );
}
