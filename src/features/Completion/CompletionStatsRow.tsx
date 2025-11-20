import { HollowSlotButton } from "../../components/Atoms/Button/HollowSlotButton";
import type { LessonStats } from "../../Types/Exercise/LessonStats";

type CompletionStatsRowProps = { userStats: LessonStats };

export function CompletionStatsRow({ userStats }: CompletionStatsRowProps) {
  const { coins, accuracy } = userStats;

  return (
    <div className="flex bg-ludoGrayLight py-4 rounded-2xl gap-8 items-center justify-center">
      <HollowSlotButton>
        <p className="px-4">Coins: {coins}</p>
      </HollowSlotButton>
      <HollowSlotButton>
        <p className="px-4">Accuracy: {accuracy}</p>
      </HollowSlotButton>
    </div>
  );
}
