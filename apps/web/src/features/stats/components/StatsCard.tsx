import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { ReactNode } from "react";

type StatsCardProps = {
  children: ReactNode;
  score?: number;
  text: string;
  onClick?: () => void;
  graph?: ReactNode;
};

export function StatsCard({
  score,
  text,
  children,
  onClick,
  graph,
}: StatsCardProps) {
  return (
    <LudoButton
      onClick={() => onClick?.()}
      className="flex items-center px-4 py-3 h-auto w-full justify-between"
    >
      <div className="flex flex-col gap-1.5 items-start select-none pointer-events-none">
        <div className="flex gap-2 items-center">
          {children}
          {score !== undefined && (
            <p className="text-xl font-semibold tabular-nums">{score}</p>
          )}
        </div>
        <p className="text-sm text-left text-ludo-white/70">{text}</p>
      </div>
      {graph && (
        <div className="w-24 h-12 shrink-0 pointer-events-none select-none ml-3">
          {graph}
        </div>
      )}
    </LudoButton>
  );
}
