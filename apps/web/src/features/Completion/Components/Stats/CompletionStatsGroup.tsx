import { HollowSlotButton } from "../../../../../../../packages/design-system/primitives/hollow-slot.tsx";
import { LabelPair } from "../../../../../../../packages/design-system/primitives/LabelPair.tsx";
import type { LessonStats } from "../../../../../../../packages/types/Completion/LessonStats.ts";

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
