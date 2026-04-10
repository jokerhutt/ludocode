import type { LessonStats } from "@ludocode/types/Completion/LessonStats.ts";
import { testIds } from "@ludocode/util/test-ids";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsGroup({ userStats }: CompletionStatsRowProps) {
  const { coins, accuracy, xpGained } = userStats;
  const scaledAccuracy = accuracy * 100;

  const formattedAccuracy = Number.isInteger(scaledAccuracy)
    ? scaledAccuracy.toString()
    : scaledAccuracy.toFixed(2);

  return (
    <div className="flex gap-4 text-ludo-white-bright items-center bg-ludo-surface p-4 rounded-lg justify-center">
      <div data-testid={testIds.completion.coins}>
        <p className=" px-2 lg:px-4">Coins: {coins}</p>
      </div>
      <div data-testid={testIds.completion.xp}>
        <p className="px-2 lg:px-4">+{xpGained} XP</p>
      </div>
      <div data-testid={testIds.completion.accuracy}>
        <p className="px-2 lg:px-4">Accuracy: {formattedAccuracy}%</p>
      </div>
    </div>
  );
}
