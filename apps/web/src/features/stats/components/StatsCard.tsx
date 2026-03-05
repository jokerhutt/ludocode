import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { ReactNode } from "react";

type StatsCardProps = {
  children: ReactNode;
  score?: number;
  text: string;
  onClick?: () => void;
};

export function StatsCard({ score, text, children, onClick }: StatsCardProps) {
  return (
    <div className="w-full flex">
      <LudoButton
        onClick={() => onClick?.()}
        className="flex items-start px-4 py-3 h-auto gap-1.5 flex-col"
      >
        <div className="flex gap-2 select-none pointer-events-none items-center">
          {children}
          {score !== undefined && (
            <p className="text-xl font-semibold select-none pointer-events-none tabular-nums">
              {score}
            </p>
          )}
        </div>
        <p className="text-sm select-none pointer-events-none text-ludo-white/70">
          {text}
        </p>
      </LudoButton>
    </div>
  );
}
