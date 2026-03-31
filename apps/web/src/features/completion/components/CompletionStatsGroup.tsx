import { LabelPair } from "@ludocode/design-system/primitives/label-pair.tsx";
import type { LessonStats } from "@ludocode/types/Completion/LessonStats.ts";
import { testIds } from "@ludocode/util/test-ids";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsGroup({ userStats }: CompletionStatsRowProps) {
  const { coins, accuracy } = userStats;
  const scaledAccuracy = accuracy * 100;

  const formattedAccuracy = Number.isInteger(scaledAccuracy)
    ? scaledAccuracy.toString()
    : scaledAccuracy.toFixed(2);

  return (
    <LabelPair className="bg-ludo-surface p-4 rounded-lg gap-4 justify-center">
      <div data-testid={testIds.completion.coins}>
        <p className=" px-2 lg:px-4">Coins: {coins}</p>
      </div>
      <div data-testid={testIds.completion.accuracy}>
        <p className="px-2 lg:px-4">Accuracy: {formattedAccuracy}%</p>
      </div>
    </LabelPair>
  );
}
