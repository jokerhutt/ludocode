import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { ReactNode } from "react";
import { cn } from "@ludocode/design-system/cn-utils";

type WideOnboardingOptionProps = {
  onClick: () => void;
  isSelected: boolean;
  children: ReactNode;
  dataTestId?: string;
};

export function WideOnboardingOption({
  onClick,
  isSelected,
  children,
  dataTestId,
}: WideOnboardingOptionProps) {
  return (
    <LudoButton
      data-testid={dataTestId}
      onClick={onClick}
      variant={isSelected ? "alt" : "default"}
      className={cn(
        "p-6 min-h-30 flex flex-col items-center gap-2 justify-center rounded-2xl",
        "transition-all border-2 duration-200",
        isSelected
          ? "border-transparent"
          : "border-transparent hover:border-ludo-accent/30 hover:scale-[1.02]",
      )}
    >
      {children}
    </LudoButton>
  );
}
