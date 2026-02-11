import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type CurriculumListBodyProps = { children: ReactNode; className?: string };

export function CurriculumPreviewContent({
  children,
  className,
}: CurriculumListBodyProps) {
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

type CurriculumListHeaderProps = { children: ReactNode };

export function CurriculumPreviewHeader({
  children,
}: CurriculumListHeaderProps) {
  return (
    <div className="flex justify-between border-b-3 border-b-ludo-border h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}

type CurriculumListFooterProps = { children: ReactNode };

export function CurriculumPreviewFooter({
  children,
}: CurriculumListFooterProps) {
  return (
    <div className="flex justify-between border-t-3 border-t-ludo-border text-ludoAltText  h-14 px-4 py-2 items-center">
      {children}
    </div>
  );
}
