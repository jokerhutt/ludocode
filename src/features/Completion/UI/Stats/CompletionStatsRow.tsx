
import { HollowSlotButton } from "@/components/design-system/atoms/button/hollow-slot-button.tsx";
import { HollowSlotButtonGroup } from "@/components/design-system/blocks/group/hollow-slot-button-group.tsx";
import type { LessonStats } from "@/types/Completion/LessonStats.ts";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsRow({ userStats }: CompletionStatsRowProps) {
  const { coins, accuracy } = userStats;

  return (
    <HollowSlotButtonGroup className="bg-ludoGrayLight p-4 rounded-2xl gap-4 justify-center">
      <HollowSlotButton>
        <p className="px-4">Coins: {coins}</p>
      </HollowSlotButton>
      <HollowSlotButton>
        <p className="px-4">Accuracy: {accuracy}</p>
      </HollowSlotButton>
    </HollowSlotButtonGroup>
  );
}
