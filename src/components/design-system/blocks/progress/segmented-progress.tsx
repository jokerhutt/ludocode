import { ProgressCell } from "@/components/design-system/atoms/progress/progress-cell.tsx";

export function SegmentedProgress({
  total,
  completed,
  className = "",
}: {
  total: number;
  completed: number;
  className?: string;
}) {
  const safeTotal = Math.max(1, total);
  const safeCompleted = Math.min(Math.max(0, completed), safeTotal);

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeTotal}
      aria-valuenow={safeCompleted}
      className={`w-full ${className}`}
    >
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${safeTotal}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: safeTotal }).map((_, i) => {
          return (
            <ProgressCell
              key={i}
              index={i}
              safeCompleted={safeCompleted}
              safeTotal={safeTotal}
            />
          );
        })}
      </div>
    </div>
  );
}
