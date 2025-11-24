import { useStatsContext } from "@/features/Common/StatsContext";
import { useModal } from "@/Hooks/UI/useModal";
import { HollowSlotButtonGroup } from "../Molecules/Group/HollowSlotButtonGroup";
import { HollowSlotButton } from "../Atoms/Button/HollowSlotButton";
import { CommitIcon } from "../Atoms/Icons/CustomIcon";
import { FireIcon } from "@heroicons/react/24/solid";
import { CoinsDialog } from "../Molecules/Dialog/CoinsDialog";
import { StreakStatsDialog } from "../Molecules/Dialog/StreakStatsDialog";

type StatsGroupProps = { groupClassName?: string; buttonClassName?: string };

export function StatsGroup({groupClassName, buttonClassName}: StatsGroupProps) {
  const { coins, streak } = useStatsContext();

  const {
    modalOpen: coinsOpen,
    openModal: openCoins,
    closeModal: closeCoins,
  } = useModal();
  const {
    modalOpen: streakOpen,
    openModal: openStreak,
    closeModal: closeStreak,
  } = useModal();

  return (
    <>
      <HollowSlotButtonGroup className={groupClassName}>
        <HollowSlotButton className={buttonClassName} onClick={() => openCoins()}>
          <CommitIcon className="h-5 text-pythonYellow" />
          <p className="text-white text-sm">{coins}</p>
        </HollowSlotButton>
        <HollowSlotButton onClick={() => openStreak()}>
          <FireIcon className="h-5 text-orange-400" />
          <p className="text-sm">{streak}</p>
        </HollowSlotButton>
      </HollowSlotButtonGroup>
      <CoinsDialog open={coinsOpen} close={closeCoins} />
      <StreakStatsDialog open={streakOpen} close={closeStreak} />
    </>
  );
}
