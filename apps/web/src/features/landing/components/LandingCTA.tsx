import { cn } from "@ludocode/design-system/cn-utils";
import {
  LudoButton,
  type LudoButtonVariant,
} from "@ludocode/design-system/primitives/ludo-button";
import type { ReactNode } from "react";

type LandingCTAProps = {
  title: string;
  subtitle?: string;
  onClick: () => void;
  variant?: "large" | "default";
  className?: string;
  buttonVariant?: LudoButtonVariant;
  children: ReactNode;
};

export function LandingCTA({
  title,
  subtitle,
  onClick,
  variant = "default",
  className,
  buttonVariant = "default",
  children,
}: LandingCTAProps) {
  const gapStyle = variant == "default" ? "gap-6" : "gap-8";
  const titleStyle = variant == "default" ? "lg:text-3xl" : "lg:text-4xl";
  const subtitleStyle = variant == "default" ? "max-w-md" : "max-w-xl";
  const buttonStyle = variant == "default" ? "max-w-sm" : "max-w-md"

  return (
    <section
      className={cn(
        "px-6 lg:px-18 py-10 flex flex-col items-center text-center",
        gapStyle, className
      )}
    >
      <h2
        className={cn("text-2xl font-bold text-ludo-white-bright", titleStyle)}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-base text-ludo-white", subtitleStyle)}>
          {subtitle}
        </p>
      )}
      <div className={cn("w-full", buttonStyle)}>
        <LudoButton variant={buttonVariant} onClick={onClick}>
          {children}
        </LudoButton>
      </div>
    </section>
  );
}
