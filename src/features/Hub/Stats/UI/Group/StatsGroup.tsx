import { useStatsContext } from "@/features/Hub/Stats/Context/StatsContext.tsx";
import { HollowSlotButtonGroup } from "../../../../../components/design-system/blocks/group/hollow-slot-button-group.tsx";
import { HollowSlotButton } from "@/components/design-system/atoms/button/hollow-slot-button.tsx";
import { CommitIcon } from "@/components/design-system/atoms/hero-icon/custom-icon.tsx";
import { FireIcon } from "@heroicons/react/24/solid";
import { CoinsDialog } from "@/features/Hub/Stats/UI/Dialog/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/features/Hub/Stats/UI/Dialog/StreakStatsDialog.tsx";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";

type StatsGroupProps = { groupClassName?: string; buttonClassName?: string };

export function StatsGroup({
  groupClassName,
  buttonClassName,
}: StatsGroupProps) {
  const { data: pastWeekStreak } = useQuery(qo.streakPastWeek());
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

        <StreakStatsDialog
          pastWeekStreak={pastWeekStreak ?? []}
          streak={userStreak}
        >
          <HollowSlotButton>
            <FireIcon className="h-5 text-orange-400" />
            <p className="text-sm">{current}</p>
          </HollowSlotButton>
        </StreakStatsDialog>
      </HollowSlotButtonGroup>
    </>
  );
}
