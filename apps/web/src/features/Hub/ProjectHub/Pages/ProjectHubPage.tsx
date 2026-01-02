import type { ProjectSnapshot } from "../../../../../../../packages/types/Project/ProjectSnapshot.ts";
import {} from "@/hooks/UI/useModal.tsx";
import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { ProjectCard } from "@/features/Hub/ProjectHub/Components/Card/ProjectCard.tsx";
import { CreateProjectDialog } from "@/features/Hub/ProjectHub/Components/Dialog/CreateProjectDialog.tsx";
import { projectHeroContent } from "../content.ts";
import { Hero } from "../../../../../../../packages/design-system/zones/hero.tsx";
import { LudoButton } from "../../../../../../../packages/design-system/primitives/ludo-button.tsx";
import { useModal } from "@ludocode/hooks";

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
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className=" relative main-col-wide flex flex-col gap-6 justify-start min-w-0">
          <Hero {...projectHeroContent}>
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
          </Hero>

          <div className="grid lg:grid-cols-2 gap-8">
            {allProjects.map((project: ProjectSnapshot) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
