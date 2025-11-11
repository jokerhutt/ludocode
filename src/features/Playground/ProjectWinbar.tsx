import type { ReactNode } from "react";

type ProjectWinbarProps = { children: ReactNode };

export function ProjectWinbar({ children }: ProjectWinbarProps) {
  return (
    <div className="h-10 px-6 w-full max-h-10 min-h-10 bg-ludoGrayLight/70">
      {children}
    </div>
  );
}
