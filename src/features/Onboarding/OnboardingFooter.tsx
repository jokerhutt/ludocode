import { ActionButton } from "@/components/Atoms/Button/ActionButton";
import { DefaultFooter } from "@/components/Molecules/Footer/DefaultFooter";
import { useOnboardingContext } from "./OnboardingContext";

type OnboardingFooterProps = {};

export function OnboardingFooter({}: OnboardingFooterProps) {
  const { hook } = useOnboardingContext();
  const { canAdvance, next } = hook;

  return (
    <DefaultFooter phase="DEFAULT">
      <div className="flex w-full justify-between py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11">
        <div />
        <ActionButton
          text="Continue"
          onClick={() => next()}
          active={canAdvance()}
          variant="default"
        />
      </div>
    </DefaultFooter>
  );
}
