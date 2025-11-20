import { FireIcon } from "@heroicons/react/24/solid";
import { navIcons } from "../constants/navIcons.ts";
import { HollowSlotButton } from "../components/Atoms/Button/HollowSlotButton.tsx";
import { CommitIcon } from "../components/Atoms/Icons/CustomIcon.tsx";
import { CommonHeader } from "../components/Molecules/Header/CommonHeader.tsx";
import { useStatsContext } from "../features/Common/StatsContext.tsx";
import { useLocation } from "@tanstack/react-router";
import { useModal } from "@/Hooks/UI/useModal.tsx";
import { CoinsDialog } from "@/components/Molecules/Dialog/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/components/Molecules/Dialog/StreakStatsDialog.tsx";
import { HollowSlotButtonGroup } from "@/components/Molecules/Group/HollowSlotButtonGroup.tsx";

type DesktopHeaderProps = {};

export function DesktopHeader({}: DesktopHeaderProps) {
  const icons = navIcons;

  const { coins, streak } = useStatsContext();

  const location = useLocation();

  const isActive = (iconPath: string, altPath?: string): boolean => {
    if (iconPath === "/") return location.pathname === "/";

    return (
      location.pathname.startsWith(iconPath) ||
      (!!altPath && location.pathname.startsWith(altPath))
    );
  };

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
    <CommonHeader device="Desktop">
      <div className="col-start-2 col-end-12 flex items-center justify-between">
        <HollowSlotButtonGroup>
          {icons.map((icon) => (
            <HollowSlotButton active={isActive(icon.path)} key={icon.name}>
              <p
                onClick={() => !!icon.onClick && icon.onClick()}
                className="text-white text-sm"
              >
                {icon.name}
              </p>
            </HollowSlotButton>
          ))}
        </HollowSlotButtonGroup>

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
    </CommonHeader>
  );
}
