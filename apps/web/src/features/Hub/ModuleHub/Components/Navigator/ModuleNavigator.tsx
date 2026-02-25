import { cn } from "@ludocode/design-system/cn-utils";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import { getRouteApi, useRouter } from "@tanstack/react-router";
import type { ModuleProgress } from "@/features/Hub/ModuleHub/Hooks/useTreeData.tsx";
import { CheckIcon, RotateCcwIcon } from "lucide-react";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Spinner } from "@ludocode/external/ui/spinner";
import { useResetCourseProgress } from "@/hooks/Queries/Mutations/useResetCourseProgress.tsx";

type ModuleNavigatorProps = {
  modules: LudoModule[];
  courseId: string;
  courseName: string;
  moduleProgress: Map<string, ModuleProgress>;
};

export function ModuleNavigator({
  modules,
  courseId,
  courseName,
  moduleProgress,
}: ModuleNavigatorProps) {
  const routeApi = getRouteApi("/_app/_hub/learn/$courseId/$moduleId");
  const router = useRouter();
  const { moduleId } = routeApi.useParams();

  const resetMutation = useResetCourseProgress();
  const isResetting = resetMutation.isPending;

  const selectModule = (selectedModuleId: string) => {
    if (moduleId === selectedModuleId) return;
    router.navigate(
      ludoNavigation.hub.module.toModule(courseId, selectedModuleId),
    );
  };

  const handleReset = () => {
    if (isResetting) return;
    resetMutation.mutate(courseId);
  };

  const totalLessons = Array.from(moduleProgress.values()).reduce(
    (sum, p) => sum + p.total,
    0,
  );
  const completedLessons = Array.from(moduleProgress.values()).reduce(
    (sum, p) => sum + p.completed,
    0,
  );
  const overallPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Course header */}
      <div className="rounded-xl bg-ludo-surface/50 p-4 flex flex-col gap-3">
        <div>
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
            Course
          </p>
          <h2 className="text-white text-lg font-bold leading-tight mt-0.5 truncate">
            {courseName}
          </h2>
        </div>

        {/* Overall progress */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">
              {completedLessons}/{totalLessons} lessons
            </span>
            <span className="text-ludo-accent text-xs font-bold">
              {overallPercent}%
            </span>
          </div>
          <ProgressBar percent={overallPercent} />
        </div>
      </div>

      {/* Module list */}
      <div>
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest px-1 mb-2">
          Modules
        </p>
        <div className="flex flex-col gap-1">
          {modules.map((module) => {
            const isActive = moduleId === module.id;
            const progress = moduleProgress.get(module.id);

            return (
              <ModuleNavigatorRow
                key={module.id}
                module={module}
                isActive={isActive}
                progress={progress}
                onClick={() => selectModule(module.id)}
              />
            );
          })}
        </div>
      </div>

      {/* Reset button */}
      <div className="pt-2">
        <LudoButton
          variant="default"
          disabled={isResetting}
          className="w-full h-10 text-sm gap-2"
          onClick={handleReset}
        >
          {isResetting ? (
            <Spinner className="text-ludo-accent-muted" />
          ) : (
            <>
              <RotateCcwIcon className="w-3.5 h-3.5" />
              Reset Progress
            </>
          )}
        </LudoButton>
      </div>
    </div>
  );
}

type ModuleNavigatorRowProps = {
  module: LudoModule;
  isActive: boolean;
  progress?: ModuleProgress;
  onClick: () => void;
};

function ModuleNavigatorRow({
  module,
  isActive,
  progress,
  onClick,
}: ModuleNavigatorRowProps) {
  const isComplete =
    progress != null &&
    progress.total > 0 &&
    progress.completed === progress.total;
  const percent =
    progress && progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150",
        "text-left group hover:cursor-pointer",
        isActive
          ? "bg-ludo-accent/15 ring-1 ring-ludo-accent/50"
          : "hover:bg-ludo-surface/30",
      )}
    >
      {/* Number badge */}
      <span
        className={cn(
          "shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
          isComplete
            ? "bg-green-500/20 text-green-400"
            : isActive
              ? "bg-ludo-accent text-white"
              : "bg-ludo-surface text-white/50 group-hover:text-white/80",
        )}
      >
        {isComplete ? <CheckIcon className="w-3.5 h-3.5" /> : module.orderIndex}
      </span>

      {/* Module info */}
      <div className="flex flex-col min-w-0 flex-1">
        <span
          className={cn(
            "text-sm font-medium truncate transition-colors",
            isActive ? "text-white" : "text-white/60 group-hover:text-white/90",
          )}
        >
          {module.title}
        </span>

        {/* Per-module progress bar */}
        {progress && (
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-300",
                  isComplete ? "bg-green-400" : "bg-ludo-accent",
                )}
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-[10px] text-white/30 tabular-nums shrink-0">
              {progress.completed}/{progress.total}
            </span>
          </div>
        )}
      </div>

      {/* Active dot */}
      {isActive && (
        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-ludo-accent animate-pulse" />
      )}
    </button>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-out",
          percent === 100 ? "bg-green-400" : "bg-ludo-accent",
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
