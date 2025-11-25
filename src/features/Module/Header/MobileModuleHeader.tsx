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
import { ModuleSelectionBar } from "../ModuleSelectionBar.tsx";
import { HollowSlotButtonGroup } from "@/components/Molecules/Group/HollowSlotButtonGroup.tsx";
import { SelectModuleDialog } from "@/components/Molecules/Dialog/SelectModuleDialog.tsx";
import type { LudoCourse } from "@/Types/Catalog/LudoCourse.ts";
import type { LudoModule } from "@/Types/Catalog/LudoModule.ts";

type ModuleHeaderProps = { activeCourse: LudoCourse; modules: LudoModule[] };

export function ModuleHeader() {
  return (
    <HeaderWithBar className="flex-col flex px-4" device="Mobile">
      <div className="col-start-2 col-end-12 flex py-2 items-center justify-between">
        {/* <HollowSlotButtonGroup>
          <SelectModuleDialog activeCourse={activeCourse} modules={modules}>
            <HollowSlotButton
              onClick={() => router.navigate(ludoNavigation.courseRoot())}
            >
              <PythonIcon className="h-6" />
              <p>Module 1</p>
              <ArrowsRightLeftIcon className="h-6 text-white" />
            </HollowSlotButton>
          </SelectModuleDialog>
        </HollowSlotButtonGroup> */}
        <div className="flex w-full text-white justify-end items-center">
          <StatsGroup groupClassName="gap-4" />
        </div>
      </div>
    </HeaderWithBar>
  );
}
