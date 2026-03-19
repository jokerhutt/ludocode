import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useAutoSaveProject } from "@/features/project/hooks/useAutoSaveProject.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { SaveStatusIcon } from "@/features/project/workbench/components/SaveStatusIcon.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { router } from "@/main.tsx";
import type { ProjectMode } from "@/layouts/project/ProjectLayout";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { Bookmark, Copy, HeartIcon } from "lucide-react";

type ProjectHeaderProps = {
  mode?: ProjectMode;
};

export function ProjectHeader({ mode = "READONLY" }: ProjectHeaderProps) {
  const { project, files, entryFileId } = useProjectContext();
  const { projectName } = project;

  const isAutoSaveEnabled = mode === "EDIT";

  const { isSaved, isSaving, error, lastSavedAt } = useAutoSaveProject({
    enabled: isAutoSaveEnabled,
    project,
    files,
    debounceMs: 1000,
    entryFileId,
  });

  const goToProjectHub = () => {
    router.navigate(ludoNavigation.hub.project.toProjectHub());
  };

  return (
    <LudoHeader>
      <LudoHeader.Shell className="border-b lg:border-b" device="Desktop">
        <div className="col-span-1 text-ludo-white-bright pl-6 lg:col-span-3 flex items-center">
          <HollowSlotButton className="h-8" onClick={() => goToProjectHub()}>
            <HeroIcon className="h-4" iconName="ArrowLeftIcon" />
          </HollowSlotButton>
        </div>
        <div className="col-span-10 text-ludo-white-bright flex items-center gap-4 justify-center lg:col-span-6 ">
          <h1>{projectName}</h1>
          {isAutoSaveEnabled && (
            <SaveStatusIcon
              isSaved={isSaved}
              isSaving={isSaving}
              error={error}
              lastSavedAt={lastSavedAt}
            />
          )}
        </div>
        <div className="col-span-1 text-ludo-white-bright pr-8 lg:col-span-3">
          {mode == "READONLY" && (
            <div className="flex h-full justify-end gap-4 items-center">
              <LudoButton
                shadow={false}
                className="h-7 rounded-sm w-auto px-4 text-sm"
                variant="alt"
              >
                Copy
              </LudoButton>
              <div className="flex items-center justify-end gap-1">
                <HeartIcon className="h-6" />
              </div>
            </div>
          )}
        </div>
        <LudoHeader.Bar />
      </LudoHeader.Shell>
    </LudoHeader>
  );
}
