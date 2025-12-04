import type { ProjectSnapshot } from "@/types/Project/ProjectSnapshot.ts";
import { useModal } from "@/hooks/UI/useModal.tsx";
import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { ProjectCard } from "@/features/Hub/ProjectHub/UI/Card/ProjectCard.tsx";
import { ProjectHubHero } from "@/features/Hub/ProjectHub/UI/Hero/ProjectHubHero.tsx";
import { CreateProjectDialog } from "@/features/Hub/ProjectHub/UI/Dialog/CreateProjectDialog.tsx";
import { FeatureDisabledPage } from "@/features/Error/FeatureDisabledPage";
import { useFeatureEnabledCheck } from "@/hooks/App/useFeatureEnabledCheck";

export function ProjectHubPage() {

  const {meta, enabled} = useFeatureEnabledCheck({feature: "isGcsEnabled"})

  if (!enabled) {
    return <FeatureDisabledPage meta={meta} />;
  }

  const { data: projectsPacket } = useSuspenseQuery(qo.allProjects());
  const allProjects = projectsPacket.projects;

  const {
    modalOpen: createProjectOpen,
    openModal: openCreateProject,
    closeModal: closeCreateProject,
  } = useModal();

  return (
    <>
      <div className="grid col-span-full overflow-y-auto min-h-0 p-8 h-full grid-cols-12">
        <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <ProjectHubHero openCreateProject={openCreateProject} />

          <div className="flex flex-col gap-8 pb-8">
            {allProjects.map((project: ProjectSnapshot) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </div>
        <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
      </div>
      <CreateProjectDialog
        hash={uuid()}
        open={createProjectOpen}
        close={() => closeCreateProject()}
      />
    </>
  );
}
