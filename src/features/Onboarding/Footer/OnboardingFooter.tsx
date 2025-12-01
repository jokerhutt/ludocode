
import { AppFooter } from "@/components/design-system/blocks/footer/app-footer.tsx";
import { useOnboardingContext } from "@/hooks/Context/Onboarding/OnboardingContext";
import { ActionButton } from "@/components/design-system/atoms/button/action-button.tsx";

type OnboardingFooterProps = {};

export function OnboardingFooter({}: OnboardingFooterProps) {
  const { hook } = useOnboardingContext();
  const { canAdvance, next } = hook;

  return (
    <AppFooter>
      <div className="flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <div />
        <ActionButton
          text="Continue"
          onClick={() => next()}
          active={canAdvance()}
          variant="default"
        />
      </div>
    </AppFooter>
  );
}
