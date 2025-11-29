import { ActionButton } from "@/components/Atoms/Button/ActionButton";
import { AppFooter } from "@/components/Molecules/Footer/AppFooter";

type CompletionFooterProps = { handleContinue: () => void };

export function CompletionFooter({
  handleContinue,
}: CompletionFooterProps) {
  return (
    <AppFooter>
      <div
        className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
      >
        <ActionButton
          onClick={() => handleContinue()}
          text="Continue"
          active={true}
        />
      </div>
    </AppFooter>
  );
}
