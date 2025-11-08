import { FireIcon } from "@heroicons/react/24/solid";
import { navIcons } from "../constants/navIcons.ts";
import { HollowSlot } from "../components/Atoms/Slot/HollowSlot.tsx";
import { CommitIcon } from "../components/Atoms/Icons/CustomIcon.tsx";
import { CommonHeader } from "../components/Molecules/Header/CommonHeader.tsx";
import { useStatsContext } from "../features/Common/StatsContext.tsx";
import { useLocation } from "@tanstack/react-router";
import { useModal } from "@/Hooks/UI/useModal.tsx";
import { CoinsDialog } from "@/components/Molecules/Dialog/CoinsDialog.tsx";
import { StreakStatsDialog } from "@/components/Molecules/Dialog/StreakStatsDialog.tsx";

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
        <div className="flex gap-4 items-center">
          {icons.map((icon) => (
            <HollowSlot active={isActive(icon.path)} key={icon.name}>
              <p
                onClick={() => !!icon.onClick && icon.onClick()}
                className="text-white"
              >
                {icon.name}
              </p>
            </HollowSlot>
          ))}
        </div>

        <div className="flex w-full text-white justify-end gap-2 items-center">
          <HollowSlot onClick={() => openCoins()}>
            <CommitIcon className="h-7 text-pythonYellow" />
            <p className="text-white">{coins}</p>
          </HollowSlot>
          <HollowSlot onClick={() => openStreak()}>
            <FireIcon className="h-7 text-orange-400" />
            <p>{streak}</p>
          </HollowSlot>
        </div>
      </div>
      <CoinsDialog open={coinsOpen} close={closeCoins} />
      <StreakStatsDialog open={streakOpen} close={closeStreak} />
    </CommonHeader>
  );
}
