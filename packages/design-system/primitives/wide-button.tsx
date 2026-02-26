import type { ReactNode } from "react";
import { cn } from "../cn-utils";

type WideButtonProps = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export function WideButton({
  onClick,
  active,
  children,
  className,
}: WideButtonProps) {
  return (
    <div
      onClick={() => onClick?.()}
      className={cn(
        "w-full px-6 py-3 bg-ludo-surface rounded-lg transition-all duration-100 select-none",
        "hover:cursor-pointer active:translate-y-[3px] active:shadow-none",
        active
          ? `bg-ludo-surface shadow-[0_5px_0_#3F4FAF] `
          : "border-ludo-surface shadow-[0_5px_0_#262E57] hover:brightness-110",
        className,
      )}
    >
      {children}
    </div>
  );
}
