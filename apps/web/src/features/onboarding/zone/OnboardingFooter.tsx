import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { FooterShell } from "@ludocode/design-system/zones/footer-shell.tsx";
import { useOnboardingContext } from "@/features/onboarding/context/OnboardingContext.tsx";
import { stepOrder } from "@/features/onboarding/steps/OnboardingSteps.ts";

type OnboardingFooterProps = {};

export function OnboardingFooter({}: OnboardingFooterProps) {
  const { flow: hook } = useOnboardingContext();
  const { canAdvance, next, position } = hook;

  return (
    <FooterShell className="border-t border-t-ludo-border">
      <div className="flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <LudoButton
          className="h-11 px-8 text-sm font-semibold"
          variant="alt"
          onClick={() => next()}
          disabled={!canAdvance}
        >
          {position.current + 1 === stepOrder.length ? "Finish" : "Continue"}
        </LudoButton>
      </div>
    </FooterShell>
  );
}
