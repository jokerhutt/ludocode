import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot.ts";
import { useModal } from "@/Hooks/UI/useModal.tsx";
import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries.ts";
import { ProjectCard } from "./Card/ProjectCard.tsx";
import { PlaygroundHero } from "./Hero/PlaygroundHero.tsx";
import { CreateProjectDialog } from "@/components/LudoComponents/Blocks/Dialog/Create/CreateProjectDialog.tsx";

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
      <div className="grid col-span-full overflow-y-auto min-h-0 p-8 h-full grid-cols-12">
        <div className="col-span-1 lg:bg-ludoGrayDark lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <PlaygroundHero openCreateProject={openCreateProject} />

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
