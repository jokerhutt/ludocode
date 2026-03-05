import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { LudoButtonVariant } from "@ludocode/design-system/primitives/ludo-button";
import type { ComponentPropsWithoutRef } from "react";

type ShadowLessButtonProps = Omit<
  ComponentPropsWithoutRef<typeof LudoButton>,
  "shadow"
> & {
  variant?: LudoButtonVariant;
};

export function ShadowLessButton({
  children,
  variant = "alt",
  className,
  ...props
}: ShadowLessButtonProps) {
  return (
    <LudoButton
      className={className || "w-auto h-auto px-4 py-1 rounded-sm"}
      shadow={false}
      variant={variant}
      {...props}
    >
      {children || <p className="text-sm">Edit Exercises</p>}
    </LudoButton>
  );
}
