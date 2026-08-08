import { cn } from "@ludocode/design-system/cn-utils.ts";

type ModulePathHeaderProps = {
  moduleTitle: string;
  moduleIndex: number;
  moduleCount: number;
  completedLessons: number;
  totalLessons: number;
  className?: string;
};

export function ModulePathHeader({
  moduleTitle,
  moduleIndex,
  moduleCount,
  completedLessons,
  totalLessons,
  className,
}: ModulePathHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex w-full flex-col items-center gap-1 bg-ludo-background pb-3 pt-1 text-center",
        className,
      )}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ludo-accent-muted">
        Module {moduleIndex} of {moduleCount}
      </span>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-ludo-white-bright">
        {moduleTitle}
      </h1>
      <span className="text-xs tabular-nums text-ludo-white-dim">
        {completedLessons}/{totalLessons} lessons complete
      </span>
      <div className="mt-3 h-px w-full bg-ludo-surface" />
    </header>
  );
}
