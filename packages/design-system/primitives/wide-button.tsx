import type { ReactNode } from "react";

type WideButtonProps = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function WideButton({ onClick, active, children }: WideButtonProps) {
  const style = active ? `border-ludo-accent-muted` : "border-ludo-surface";

  return (
    <div
      onClick={() => onClick?.()}
      className={`w-full ${style} border-2 px-6 py-2 bg-ludo-surface rounded-lg `}
    >
      {children}
    </div>
  );
}
