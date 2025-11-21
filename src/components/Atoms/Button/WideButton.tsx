import type { ReactNode } from "react";

type WideButtonProps = {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
};

export function WideButton({ onClick, active, children }: WideButtonProps) {
  const style = active
    ? `border-ludoLightPurple`
    : "border-ludoGrayLight";

  return (
    <div
      onClick={() => onClick?.()}
      className={`w-full ${style} border-2 px-6 py-2 bg-ludoGrayLight rounded-lg `}
    >
        {children}
    </div>
  );
}
