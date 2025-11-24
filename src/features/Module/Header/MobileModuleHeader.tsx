import { ArrowsRightLeftIcon, FireIcon } from "@heroicons/react/24/solid";
import {
  CommitIcon,
  PythonIcon,
} from "../../../components/Atoms/Icons/CustomIcon.tsx";
import { HollowSlotButton } from "../../../components/Atoms/Button/HollowSlotButton.tsx";
import { HeaderWithBar } from "../../../components/Molecules/Header/HeaderWithBar.tsx";
import { useStatsContext } from "../../Common/StatsContext.tsx";
import { StatsGroup } from "@/components/Organisms/StatsGroup.tsx";
import { router } from "@/routes/router.tsx";
import { ludoNavigation } from "@/routes/ludoNavigation.tsx";

type ModuleHeaderProps = {};

export function ModuleHeader({}: ModuleHeaderProps) {
  return (
    <HeaderWithBar device="Mobile">
      <div className="col-start-2 col-end-12 flex py-2 items-center justify-between">
        <div>
          <HollowSlotButton onClick={() => router.navigate(ludoNavigation.courseRoot())}>
            <PythonIcon className="h-6" />
            <ArrowsRightLeftIcon className="h-6 text-white" />
          </HollowSlotButton>
        </div>
        <div className="flex w-full text-white justify-end items-center">
          <StatsGroup groupClassName="gap-4" />
        </div>
      </div>
    </HeaderWithBar>
  );
}
