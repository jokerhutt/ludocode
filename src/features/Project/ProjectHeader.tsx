import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";
import { HollowSlot } from "@/components/Atoms/Slot/HollowSlot";
import { CommonHeader } from "@/components/Molecules/Header/CommonHeader";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";
import { SaveStatusIcon } from "./Editor/SaveStatusIcon";
import type { SaveStatusType } from "@/Hooks/Logic/Playground/useAutoSaveProject";

type ProjectHeaderProps = {
  projectName: string;
  saveStatus: SaveStatusType  
};

export function ProjectHeader({
  projectName,
  saveStatus
}: ProjectHeaderProps) {

  const {isSaved, isSaving, error, lastSavedAt} = saveStatus

  return (
    <CommonHeader device="Desktop">
      <div className="col-span-1 text-white pl-6 lg:col-span-3 flex items-center">
        <HollowSlot
          onClick={() =>
            router.navigate(ludoNavigation.playground.toPlayground())
          }
        >
          <HeroIcon className="h-4" iconName="ArrowLeftIcon" />
        </HollowSlot>
      </div>
      <div className="col-span-10 text-white flex items-center gap-4 justify-center lg:col-span-6 ">
        <h1>{projectName}</h1>
        <SaveStatusIcon
          isSaved={isSaved}
          isSaving={isSaving}
          error={error}
          lastSavedAt={lastSavedAt}
        />
      </div>
      <div className="col-span-1 text-white lg:col-span-3"></div>
    </CommonHeader>
  );
}
