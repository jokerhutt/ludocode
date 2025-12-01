
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
import { router } from "@/routes/router";
import { useAutoSaveProject } from "@/hooks/Flows/Project/useAutoSaveProject";
import { useProjectContext } from "@/hooks/Context/Project/ProjectContext";
import { HeaderWithBar } from "@/components/design-system/blocks/header/header-with-bar.tsx";
import { HollowSlotButton } from "@/components/design-system/atoms/button/hollow-slot-button.tsx";
import { HeroIcon } from "@/components/design-system/atoms/hero-icon/hero-icon.tsx";
import { SaveStatusIcon } from "../Editor/SaveStatusIcon";

export function ProjectHeader() {
  const { project, files } = useProjectContext();
  const { projectName } = project;

  const { isSaved, isSaving, error, lastSavedAt } = useAutoSaveProject({
    project,
    files,
    debounceMs: 1000,
  });

  const goToPlayground = () => {
    router.navigate(ludoNavigation.hub.project.toProjectHub());
  };

  return (
    <HeaderWithBar device="Desktop">
      <div className="col-span-1 text-white pl-6 lg:col-span-3 flex items-center">
        <HollowSlotButton className="h-8" onClick={() => goToPlayground()}>
          <HeroIcon className="h-4" iconName="ArrowLeftIcon" />
        </HollowSlotButton>
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
    </HeaderWithBar>
  );
}
