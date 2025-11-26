import { HeroIcon } from "@/components/Atoms/Icons/HeroIcon";
import { HollowSlotButton } from "@/components/Atoms/Button/HollowSlotButton";
import { HeaderWithBar } from "@/components/Molecules/Header/HeaderWithBar";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";
import { SaveStatusIcon } from "./Editor/SaveStatusIcon";
import { useAutoSaveProject } from "@/Hooks/Logic/Project/useAutoSaveProject";
import { useProjectContext } from "../../Hooks/Context/ProjectContext";

export function ProjectHeader() {
  const { project, files } = useProjectContext();
  const { projectName } = project;

  const { isSaved, isSaving, error, lastSavedAt } = useAutoSaveProject({
    project,
    files,
    debounceMs: 1000,
  });

  const goToPlayground = () => {
    router.navigate(ludoNavigation.playground.toPlayground());
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
