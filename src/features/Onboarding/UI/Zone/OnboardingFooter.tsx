
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { useOnboardingContext } from "@/features/Onboarding/Context/OnboardingContext.tsx";
import { LudoButton } from "@/components/design/primitives/LudoButton";

type OnboardingFooterProps = {};

export function OnboardingFooter({}: OnboardingFooterProps) {
  const { hook } = useOnboardingContext();
  const { canAdvance, next } = hook;

  return (
    <AppFooter>
      <div className="flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <div />
        <LudoButton className="h-10" variant="alt" onClick={() => next()} disabled={!canAdvance()}>
          Continue
        </LudoButton>
      </div>
    </AppFooter>
  );
}
