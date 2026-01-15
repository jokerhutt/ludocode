import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { ReactNode } from "react";

type WideOnboardingOptionProps = {
  onClick: () => void;
  isSelected: boolean;
  children: ReactNode;
};

export function WideOnboardingOption({
  onClick,
  isSelected,
  children,
}: WideOnboardingOptionProps) {
  return (
    <LudoButton
      onClick={onClick}
      variant={isSelected ? "alt" : "default"}
      className={`p-6 min-h-30 flex flex-col items-center gap-2 justify-center rounded-2xl`}
    >
      {children}
    </LudoButton>
  );
}
