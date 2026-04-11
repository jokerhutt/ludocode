import type { LessonStats } from "@ludocode/types/Completion/LessonStats.ts";
import { testIds } from "@ludocode/util/test-ids";
import { ZapIcon, TargetIcon } from "lucide-react";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsGroup({ userStats }: CompletionStatsRowProps) {
  const { accuracy, xpGained } = userStats;
  const scaledAccuracy = accuracy * 100;

  const formattedAccuracy = Number.isInteger(scaledAccuracy)
    ? scaledAccuracy.toString()
    : scaledAccuracy.toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      <div
        data-testid={testIds.completion.xp}
        className="bg-ludo-surface rounded-xl p-4 flex flex-col items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-ludo-accent-muted/15 flex items-center justify-center">
          <ZapIcon className="h-5 w-5 fill-ludo-accent-muted text-ludo-accent-muted" />
        </div>
        <span className="text-ludo-accent-muted text-xl font-bold tabular-nums">
          +{xpGained}
        </span>
        <span className="text-ludo-white-dim text-xs font-medium">XP</span>
      </div>

      <div
        data-testid={testIds.completion.accuracy}
        className="bg-ludo-surface rounded-xl p-4 flex flex-col items-center gap-2"
      >
        <div className="w-10 h-10 rounded-full bg-sky-400/15 flex items-center justify-center">
          <TargetIcon className="h-5 w-5 text-sky-400" />
        </div>
        <span className="text-sky-400 text-xl font-bold tabular-nums">
          {formattedAccuracy}%
        </span>
        <span className="text-ludo-white-dim text-xs font-medium">
          Accuracy
        </span>
      </div>
    </div>
  );
}
