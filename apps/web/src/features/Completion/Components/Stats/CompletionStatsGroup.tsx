import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot";
import { LabelPair } from "@ludocode/design-system/primitives/LabelPair";
import type { LessonStats } from "@ludocode/types/Completion/LessonStats";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsGroup({ userStats }: CompletionStatsRowProps) {
  const { coins, accuracy } = userStats;

  return (
    <LabelPair className="bg-ludoGrayLight p-4 rounded-lg gap-4 justify-center">
      <HollowSlotButton>
        <p className=" px-2 lg:px-4">Coins: {coins}</p>
      </HollowSlotButton>
      <HollowSlotButton>
        <p className="px-2 lg:px-4">Accuracy: {accuracy}%</p>
      </HollowSlotButton>
    </LabelPair>
  );
}
