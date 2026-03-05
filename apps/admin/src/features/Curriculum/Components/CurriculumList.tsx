import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type CurriculumCardProps = { children: ReactNode; className?: string };

export function CurriculumCard({ children, className }: CurriculumCardProps) {
  return (
    <div
      className={cn(
        "flex rounded-lg min-h-0 text-white border-3 border-ludo-border h-full flex-col w-full",
        className,
      )}
    >
      {children}
    </div>
  );
}

type CurriculumCardContentProps = { children: ReactNode; className?: string };

export function CurriculumCardContent({
  children,
  className,
}: CurriculumCardContentProps) {
  return (
    <div
      className={cn(
        "w-full flex h-full overflow-y-auto scrollbar-ludo-accent min-h-0 p-4 bg-ludo-surface flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}

type CurriculumCardHeaderProps = { children: ReactNode };

export function CurriculumCardHeader({ children }: CurriculumCardHeaderProps) {
  return (
    <div className="flex justify-between border-b-3 border-b-ludo-border h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}

type CurriculumCardFooterProps = { children: ReactNode };

export function CurriculumCardFooter({ children }: CurriculumCardFooterProps) {
  return (
    <div className="flex justify-between border-t-3 border-t-ludo-border text-ludo-white h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}
