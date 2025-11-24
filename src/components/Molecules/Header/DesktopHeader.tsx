import { FireIcon } from "@heroicons/react/24/solid";
import { navIcons } from "../../../constants/navIcons.ts";
import { HollowSlotButton } from "../../Atoms/Button/HollowSlotButton.tsx";
import { CommitIcon } from "../../Atoms/Icons/CustomIcon.tsx";
import { HeaderWithBar } from "./HeaderWithBar.tsx";
import { useStatsContext } from "../../../features/Common/StatsContext.tsx";
import { useLocation } from "@tanstack/react-router";
import { useModal } from "@/Hooks/UI/useModal.tsx";
import { CoinsDialog } from "@/components/Molecules/Dialog/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/components/Molecules/Dialog/StreakStatsDialog.tsx";
import { HollowSlotButtonGroup } from "@/components/Molecules/Group/HollowSlotButtonGroup.tsx";
import { NavigationIconGroup } from "@/components/Organisms/NavigationIconGroup.tsx";

type DesktopHeaderProps = {};

export function DesktopHeader({}: DesktopHeaderProps) {
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
    <HeaderWithBar device="Desktop">
      <div className="col-start-2 col-end-12 flex items-center justify-between">
        <NavigationIconGroup />

        <HollowSlotButtonGroup>
          <HollowSlotButton onClick={() => openCoins()}>
            <CommitIcon className="h-5 text-pythonYellow" />
            <p className="text-white text-sm">{coins}</p>
          </HollowSlotButton>
          <HollowSlotButton onClick={() => openStreak()}>
            <FireIcon className="h-5 text-orange-400" />
            <p className="text-sm">{streak}</p>
          </HollowSlotButton>
        </HollowSlotButtonGroup>
      </div>
      <CoinsDialog open={coinsOpen} close={closeCoins} />
      <StreakStatsDialog open={streakOpen} close={closeStreak} />
    </HeaderWithBar>
  );
}
