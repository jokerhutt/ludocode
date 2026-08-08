import { ProgressSummary } from "@ludocode/design-system/primitives/progress-summary.tsx";

const MOCK_MODULE_DESCRIPTION =
  "Work through the lessons in order to pick up the ideas this module is built on, then put them together in a guided project. Each step unlocks the next one, so you can always drop in where you left off.";

type ModuleOverviewBodyProps = {
  completedLessons: number;
  totalLessons: number;
};

export function ModuleOverviewBody({
  completedLessons,
  totalLessons,
}: ModuleOverviewBodyProps) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm leading-relaxed text-ludo-white-dim">
        {MOCK_MODULE_DESCRIPTION}
      </p>

      <div className="flex flex-col gap-2">
        <div className="h-px w-full bg-ludo-surface" />
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
        completedLessons={completedLessons}
        totalLessons={totalLessons}
      />
    </div>
  );
}
