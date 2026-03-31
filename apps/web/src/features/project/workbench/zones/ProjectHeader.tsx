import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useAutoSaveContext } from "@/features/project/workbench/context/AutoSaveContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { SaveStatusIcon } from "@/features/project/workbench/components/SaveStatusIcon.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { router } from "@/main.tsx";
import type { ProjectMode } from "@/layouts/project/ProjectLayout";
import { HeartIcon, LogIn } from "lucide-react";
import { NavButton } from "@ludocode/design-system/primitives/NavButton.tsx";
import { track } from "@/analytics/track";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { useHeaderBanners } from "@/features/banner/hooks/useHeaderBanners.ts";
import { IconButton } from "@ludocode/design-system/primitives/icon-button";

type ProjectHeaderProps = {
  mode?: ProjectMode;
  authenticated?: boolean;
};

export function ProjectHeader({
  mode = "READONLY",
  authenticated,
}: ProjectHeaderProps) {
  const { project } = useProjectContext();
  const { projectName } = project;
  const { banners } = useHeaderBanners({
    localBanners: [],
  });

  const isAutoSaveEnabled = mode === "EDIT";
  const { isSaved, isSaving, error, lastSavedAt } = useAutoSaveContext();

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
            <IconButton
              variant="large"
              onClick={() => goToProjectHub()}
              iconName="XMarkIcon"
            />
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
              <NavButton onClick={handleLoginClick}>
                <LogIn className="w-4 h-4" />
                <span>Log in</span>
              </NavButton>
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
      <LudoHeader.Banner banners={banners} />
    </LudoHeader>
  );
}
