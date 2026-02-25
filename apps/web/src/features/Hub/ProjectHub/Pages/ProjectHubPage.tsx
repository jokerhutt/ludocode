import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { ProjectCard } from "@/features/Hub/ProjectHub/Components/Card/ProjectCard.tsx";
import { CreateProjectDialog } from "@/features/Hub/ProjectHub/Components/Dialog/CreateProjectDialog.tsx";
import { projectHeroContent } from "@/features/Hub/ProjectHub/content.ts";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useModal } from "@ludocode/hooks";
import { router } from "@/main";
import { ludoNavigation } from "@/constants/ludoNavigation";

export function ProjectHubPage() {
  const { data: projectsPacket } = useSuspenseQuery(qo.allProjects());
  const allProjects = projectsPacket.projects;

  const { maxProjects, planCode } = useSuspenseQuery(qo.subscription()).data;
  const currentProjects = allProjects.length;

  const percent =
    maxProjects > 0
      ? Math.min(100, Math.round((currentProjects / maxProjects) * 100))
      : 0;

  const isAtLimit = currentProjects >= maxProjects;

  const {
    modalOpen: createProjectOpen,
    openModal: openCreateProject,
    closeModal: closeCreateProject,
  } = useModal();

  return (
    <>
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1" />
        <div className="relative col-span-10 flex flex-col gap-6 justify-start min-w-0">
          <Hero {...projectHeroContent}>
            <div className="w-full flex flex-col gap-2 items-end">
              <div className="flex justify-between items-center text-xs">
                <span
                  data-testid={`project-limits`}
                  className={
                    isAtLimit ? "text-ludo-danger" : "text-ludoAltText"
                  }
                >
                  Projects {currentProjects} / {maxProjects}
                </span>
              </div>
              <CreateProjectDialog
                hash={uuid()}
                open={createProjectOpen}
                close={() => closeCreateProject()}
              >
                <LudoButton
                  data-testid={`create-project-dialog-button`}
                  className="w-full lg:w-1/4 lg:h-8 h-full px-4"
                  variant="alt"
                  onClick={() => {
                    if (isAtLimit) {
                      router.navigate(
                        ludoNavigation.subscription.toSubscriptionComparisonPage(),
                      );
                    } else {
                      openCreateProject();
                    }
                  }}
                  title={isAtLimit ? "Project limit reached" : undefined}
                >
                  {isAtLimit ? "Upgrade" : "Create"}
                </LudoButton>
              </CreateProjectDialog>
            </div>
          </Hero>

          <div className="grid lg:grid-cols-2 gap-8">
            {allProjects.map((project: ProjectSnapshot) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </>
  );
}
