import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useAutoSaveProject } from "@/features/project/hooks/useAutoSaveProject.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { SaveStatusIcon } from "@/features/project/workbench/components/SaveStatusIcon.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { router } from "@/main.tsx";
import type { ProjectMode } from "@/layouts/project/ProjectLayout";
import { HeartIcon, LogIn } from "lucide-react";
import { HeaderNavButton } from "@/layouts/legal/ResourcesLayout";
import { track } from "@/analytics/track";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";

type ProjectHeaderProps = {
  mode?: ProjectMode;
  authenticated?: boolean;
};

export function ProjectHeader({
  mode = "READONLY",
  authenticated,
}: ProjectHeaderProps) {
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

  const handleLoginClick = () => {
    track({
      event: "LOGIN_CLICK",
      properties: { source: "project_header" },
    });
    router.navigate(ludoNavigation.auth.login(false));
  };

  const handleRegisterClick = () => {
    track({
      event: "SIGNUP_CLICK",
      properties: { source: "project_header" },
    });
    router.navigate(ludoNavigation.auth.register(false));
  };

  return (
    <LudoHeader>
      <LudoHeader.Shell
        className="border-b overflow-x-hidden lg:border-b"
        device="Both"
      >
        <div className="col-span-2 text-ludo-white-bright pl-2 lg:col-span-3 lg:pl-6 flex items-center">
          {authenticated && (
            <HollowSlotButton className="h-8" onClick={() => goToProjectHub()}>
              <HeroIcon className="h-4" iconName="ArrowLeftIcon" />
            </HollowSlotButton>
          )}
        </div>
        <div className="col-span-8 min-w-0 text-ludo-white-bright flex items-center gap-2 justify-center lg:col-span-6 lg:gap-4">
          <h1 className="truncate">{projectName}</h1>
          {isAutoSaveEnabled ? (
            <SaveStatusIcon
              isSaved={isSaved}
              isSaving={isSaving}
              error={error}
              lastSavedAt={lastSavedAt}
            />
          ) : (
            authenticated && mode == "READONLY" && <HeartIcon className="h-4" />
          )}
        </div>
        <div className="col-span-2 text-ludo-white-bright pr-2 lg:col-span-3 lg:pr-8">
          {!authenticated && (
            <div className="hidden lg:flex justify-end h-full items-center w-full gap-2">
              <HeaderNavButton onClick={handleLoginClick}>
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </HeaderNavButton>
              <LudoButton
                variant="alt"
                shadow={false}
                className="h-8 w-auto px-4 text-sm font-medium"
                onClick={handleRegisterClick}
              >
                Register
              </LudoButton>
            </div>
          )}
        </div>
        <LudoHeader.Bar />
      </LudoHeader.Shell>
    </LudoHeader>
  );
}
