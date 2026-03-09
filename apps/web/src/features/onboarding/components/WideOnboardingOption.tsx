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
        "p-4 min-h-20 flex flex-col items-center gap-1.5 justify-center rounded-xl",
        "transition-[transform] duration-100 transform-gpu will-change-transform touch-action-manipulation",
        isSelected
          ? "border-ludo-accent/40"
          : "border-transparent hover:border-ludo-border",
      )}
    >
      {children}
    </LudoButton>
  );
}
