import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot";
import { LabelPair } from "@ludocode/design-system/primitives/LabelPair";
import type { LessonStats } from "@ludocode/types/Completion/LessonStats";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsGroup({ userStats }: CompletionStatsRowProps) {
  const { coins, accuracy } = userStats;
  const scaledAccuracy = accuracy * 100;

  return (
    <LabelPair className="bg-ludo-surface p-4 rounded-lg gap-4 justify-center">
      <HollowSlotButton>
        <p className=" px-2 lg:px-4">Coins: {coins}</p>
      </HollowSlotButton>
      <HollowSlotButton>
        <p className="px-2 lg:px-4">Accuracy: {scaledAccuracy}%</p>
      </HollowSlotButton>
    </LabelPair>
  );
}
