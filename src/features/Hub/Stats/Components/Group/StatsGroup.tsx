import { useStatsContext } from "@/features/Hub/Stats/Context/StatsContext.tsx";
import { LabelPair } from "@/components/design-system/primitives/LabelPair";
import { HollowSlotButton } from "@/components/design-system/primitives/hollow-slot";
import { CommitIcon } from "@/components/design-system/primitives/custom-icon.tsx";
import { FireIcon } from "@heroicons/react/24/solid";
import { CoinsDialog } from "@/features/Hub/Stats/Components/Dialog/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/features/Hub/Stats/Components/Dialog/StreakStatsDialog.tsx";
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
      <LabelPair className={groupClassName}>
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
      </LabelPair>
    </>
  );
}
