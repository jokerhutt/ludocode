import { useStatsContext } from "@/features/Common/StatsContext";
import { HollowSlotButtonGroup } from "./HollowSlotButtonGroup";
import { HollowSlotButton } from "../../Atoms/Button/HollowSlotButton";
import { CommitIcon } from "../../Atoms/Icons/CustomIcon";
import { FireIcon } from "@heroicons/react/24/solid";
import { CoinsDialog } from "../Dialog/Stats/CoinsDialog";
import { StreakStatsDialog } from "../Dialog/Stats/StreakStatsDialog";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";

type StatsGroupProps = { groupClassName?: string; buttonClassName?: string };

export function StatsGroup({
  groupClassName,
  buttonClassName,
}: StatsGroupProps) {

  const {data: pastWeekStreak} = useSuspenseQuery(qo.streakPastWeek())
  const { coins, userStreak } = useStatsContext();
  const { current } = userStreak;

  return (
    <>
      <HollowSlotButtonGroup className={groupClassName}>
        <CoinsDialog coins={coins}>
          <HollowSlotButton className={buttonClassName}>
            <CommitIcon className="h-5 text-pythonYellow" />
            <p className="text-white text-sm">{coins}</p>
          </HollowSlotButton>
        </CoinsDialog>

        <StreakStatsDialog pastWeekStreak={pastWeekStreak} streak={userStreak}>
          <HollowSlotButton>
            <FireIcon className="h-5 text-orange-400" />
            <p className="text-sm">{current}</p>
          </HollowSlotButton>
        </StreakStatsDialog>
      </HollowSlotButtonGroup>
    </>
  );
}
