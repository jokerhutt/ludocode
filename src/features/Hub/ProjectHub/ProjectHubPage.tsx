import type { ProjectSnapshot } from "@/types/Project/ProjectSnapshot.ts";
import { useModal } from "@/hooks/UI/useModal.tsx";
import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { ProjectCard } from "@/features/Hub/ProjectHub/UI/Card/ProjectCard.tsx";
import { CreateProjectDialog } from "@/features/Hub/ProjectHub/UI/Dialog/CreateProjectDialog.tsx";
import { DefaultHero } from "@/components/design-system/blocks/hero/default-hero";
import { projectHeroContent } from "./content";
import { LudoButton } from "@/components/design/primitives/LudoButton";

export function ProjectHubPage() {
  const { data: projectsPacket } = useSuspenseQuery(qo.allProjects());
  const allProjects = projectsPacket.projects;

  const {
    modalOpen: createProjectOpen,
    openModal: openCreateProject,
    closeModal: closeCreateProject,
  } = useModal();

  return (
    <>
      <div className="layout-grid col-span-full scrollable p-8">
        <div className=" relative main-col-wide flex flex-col gap-8 items-stretch justify-start min-w-0">
          <DefaultHero {...projectHeroContent}>
            <CreateProjectDialog
              hash={uuid()}
              open={createProjectOpen}
              close={() => closeCreateProject()}
            >
              <LudoButton
                className="w-full lg:w-1/3 lg:h-10 h-full px-4 "
                variant="alt"
                onClick={() => openCreateProject()}
              >
                Create
              </LudoButton>
            </CreateProjectDialog>
          </DefaultHero>

          <div className="flex flex-col gap-8 pb-8">
            {allProjects.map((project: ProjectSnapshot) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
