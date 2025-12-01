
import { AppFooter } from "@/components/LudoComponents/Blocks/Footer/AppFooter";
import { useOnboardingContext } from "../../../Hooks/Context/Onboarding/OnboardingContext";
import { ActionButton } from "@/components/LudoComponents/Atoms/Button/ActionButton";

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
