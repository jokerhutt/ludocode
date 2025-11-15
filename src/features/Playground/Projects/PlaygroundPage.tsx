import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { ProjectsGrid } from "./ProjectsGrid";
import { playgroundRoute, router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { useModal } from "@/Hooks/UI/useModal";
import { CreateProjectDialog } from "@/components/Molecules/Dialog/CreateProjectDialog";
import { uuid } from "@tanstack/react-form";
import { useLoaderData } from "@tanstack/react-router";
import { RP_PLAYGROUND } from "@/constants/routes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { ProjectCard } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { PlaygroundHero } from "../PlaygroundHero";
import { useModifyProject } from "@/Hooks/Queries/Mutations/useModifyProject";

type PlaygroundPageProps = {};

export function PlaygroundPage({}: PlaygroundPageProps) {
  const { data: projectsPacket } = useSuspenseQuery(qo.allProjects());
  const allProjects = projectsPacket.projects;


  const {
    modalOpen: createProjectOpen,
    openModal: openCreateProject,
    closeModal: closeCreateProject,
  } = useModal();

  return (
    <>
      <div className="grid col-span-full p-8 h-full grid-cols-12">
        <div className="col-span-1 bg-ludoGrayDark lg:col-span-2"></div>
        <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
          <PlaygroundHero openCreateProject={openCreateProject}/>  

          <div className="flex flex-col gap-8 pb-8">
            {allProjects.map((project: ProjectSnapshot) => (
              <ProjectCard project={project} />
            ))}
          </div>
        </div>
        <div className="col-span-1 bg-ludoGrayDark lg:col-span-2"></div>
      </div>
      <CreateProjectDialog
        hash={uuid()}
        open={createProjectOpen}
        close={() => closeCreateProject()}
      />
    </>
  );
}
