import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useAutoSaveProject } from "@/features/Project/Hooks/useAutoSaveProject.tsx";
import { useProjectContext } from "@/features/Project/Context/ProjectContext.tsx";
import { HollowSlotButton } from "@ludocode/design-system/primitives/hollow-slot.tsx";
import { HeroIcon } from "@ludocode/design-system/primitives/hero-icon.tsx";
import { SaveStatusIcon } from "@/features/Project/Editor/SaveStatusIcon.tsx";
import { useRouter } from "@tanstack/react-router";
import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell.tsx";

export function ProjectHeader() {
  const router = useRouter();
  const { project, files } = useProjectContext();
  const { projectName } = project;

  const { isSaved, isSaving, error, lastSavedAt } = useAutoSaveProject({
    project,
    files,
    debounceMs: 1000,
  });

  const goToProjectHub = () => {
    router.navigate(ludoNavigation.hub.project.toProjectHub());
  };

  return (
    <HeaderWithBar device="Desktop">
      <div className="col-span-1 text-white pl-6 lg:col-span-3 flex items-center">
        <HollowSlotButton className="h-8" onClick={() => goToProjectHub()}>
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
