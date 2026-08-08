import { ProgressSummary } from "@ludocode/design-system/primitives/progress-summary.tsx";

type ModuleOverviewBodyProps = {
  description?: string | null;
  completedLessons: number;
  totalLessons: number;
};

export function ModuleOverviewBody({
  description,
  completedLessons,
  totalLessons,
}: ModuleOverviewBodyProps) {
  return (
    <div className="flex flex-col gap-5">
      {description && (
        <p className="text-sm leading-relaxed text-ludo-white-dim">
          {description}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {description && <div className="h-px w-full bg-ludo-surface" />}
        <ProgressSummary
          className="w-full"
          variant="col"
          detailed
          name="lessons complete"
          current={completedLessons}
          total={totalLessons}
        />
      </div>
    </div>
  );
}

type ModuleOverviewProps = ModuleOverviewBodyProps & {
  moduleTitle: string;
  moduleIndex: number;
  moduleCount: number;
};

export function ModuleOverview({
  moduleTitle,
  moduleIndex,
  moduleCount,
  description,
  completedLessons,
  totalLessons,
}: ModuleOverviewProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ludo-accent-muted">
          Module {moduleIndex} of {moduleCount}
        </span>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-ludo-white-bright">
          {moduleTitle}
        </h1>
      </div>

      <ModuleOverviewBody
        description={description}
        completedLessons={completedLessons}
        totalLessons={totalLessons}
      />
    </div>
  );
}
