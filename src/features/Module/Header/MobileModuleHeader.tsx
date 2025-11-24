import { ArrowsRightLeftIcon, FireIcon } from "@heroicons/react/24/solid";
import {
  CommitIcon,
  PythonIcon,
} from "../../../components/Atoms/Icons/CustomIcon.tsx";
import { HollowSlotButton } from "../../../components/Atoms/Button/HollowSlotButton.tsx";
import { HeaderWithBar } from "../../../components/Molecules/Header/HeaderWithBar.tsx";
import { useStatsContext } from "../../Common/StatsContext.tsx";

type ModuleHeaderProps = {};

export function ModuleHeader({}: ModuleHeaderProps) {
  const { coins, streak } = useStatsContext();

  return (
    <HeaderWithBar device="Mobile">
      <div className="col-start-2 col-end-12 flex py-2 items-center justify-between">
        <div>
          <HollowSlotButton>
            <PythonIcon className="h-6" />
            <ArrowsRightLeftIcon className="h-6 text-white" />
          </HollowSlotButton>
        </div>
        <div className="flex w-full text-white justify-end gap-2 items-center">
          <HollowSlotButton>
            <CommitIcon className="h-7 text-pythonYellow" />
            <p>{coins}</p>
          </HollowSlotButton>
          <HollowSlotButton>
            <FireIcon className="h-7 text-orange-400" />
            <p>{streak}</p>
          </HollowSlotButton>
        </div>
      </div>
    </HeaderWithBar>
  );
}
