import { type ReactNode } from "react";
import { type LudoButtonVariant } from "./ludo-button";
import { cn } from "../cn-utils";

type LudoCardProps = {
  className?: string;
  children?: ReactNode;
  selected?: boolean;
  shadow?: boolean;
  variant?: LudoButtonVariant;
  disabled?: boolean;
};

export function LudoCard({
  className,
  children,
  disabled = false,
  shadow = false,
  variant = "default",
}: LudoCardProps) {
  const variantStyles: Record<LudoButtonVariant, string> = {
    default: "bg-ludo-surface text-white",
    alt: "bg-ludo-accent text-white",
    white: "bg-white text-black",
    danger: "bg-ludo-danger text-white",
  };

  const disabledVariantStyles: Record<LudoButtonVariant, string> = {
    default: "bg-ludo-surface/50 text-white/50",
    alt: "bg-ludo-accent/40 text-white/50",
    white: "bg-white/50 text-black/50",
    danger: "bg-ludo-danger/50 text-white/50",
  };

  const shadowMap: Record<LudoButtonVariant, string> = {
    default: "shadow-[0_7px_0_#262E57]",
    alt: "shadow-[0_7px_0_#3F4FAF]",
    white: "shadow-[0_7px_0_#D1D5DB]",
    danger: "shadow-[0_7px_0_#C85A5A]",
  };

  const disabledShadowStyles: Record<LudoButtonVariant, string> = {
    default: "shadow-[0_5px_0_#262E57]/50",
    alt: "shadow-[0_5px_0_#3F4FAF]/50",
    white: "shadow-[0_5px_0_rgba(0,0,0,0.06)]",
    danger: "shadow-[0_5px_0_#C85A5A]/50",
  };

  return (
    <div
      className={cn(
        "p-2 rounded-lg",
        `${disabled ? disabledShadowStyles[variant] : shadowMap[variant]}`,
        `${disabled ? disabledVariantStyles[variant] : variantStyles[variant]}`,
        `${shadow ? "" : "shadow-none"}`,
        className,
      )}
    >
      {children && children}
    </div>
  );
}
