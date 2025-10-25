import { HollowSlot } from "../../components/Atoms/Slot/HollowSlot";
import type { LessonStats } from "../../Types/Exercise/LessonStats";
import type { LudoStats } from "../../Types/User/LudoStats";

type CompletionStatsRowProps = {userStats: LessonStats};

export function CompletionStatsRow({userStats}: CompletionStatsRowProps) {
  
    const {coins, accuracy} = userStats
  
    return (
            <div className="flex bg-ludoGrayLight py-4 rounded-2xl gap-8 items-center justify-center">
              <HollowSlot>
                <p className="px-4">Coins: {coins}</p>
              </HollowSlot>
              <HollowSlot>
                <p className="px-4">Accuracy: {accuracy}</p>
              </HollowSlot>
            </div>
  );
}