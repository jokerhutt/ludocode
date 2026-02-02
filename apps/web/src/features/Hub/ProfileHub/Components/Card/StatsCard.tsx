import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
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
        className="flex items-start px-4 py-2 h-auto gap-1 flex-col"
      >
        <div className="flex gap-2 items-center">
          {children}
          {score && <p className="text-lg">{score}</p>}
        </div>
        <p className="text-lg">{text}</p>
      </LudoButton>
    </div>
  );
}
