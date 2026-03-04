import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries.ts";
import { ProjectCard } from "@/features/Project/hub/ProjectCard.tsx";
import { CreateProjectDialog } from "@/features/Project/hub/CreateProjectDialog.tsx";
import { projectHeroContent } from "@/features/Project/hub/content.ts";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useModal } from "@ludocode/hooks";
import { router } from "@/main.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { PlusIcon } from "lucide-react";

export function ProjectHubPage() {
  const { data: projectsPacket } = useSuspenseQuery(qo.allProjects());
  const allProjects = projectsPacket.projects;

  const paymentsFeature = useSuspenseQuery(qo.activeFeatures()).data
    .paymentsEnabled;

  const { maxProjects } = useSuspenseQuery(qo.subscription()).data;
  const currentProjects = allProjects.length;

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
            <div className="flex items-center gap-4">
              <span
                data-testid="project-limits"
                className={`text-xs font-medium tabular-nums ${isAtLimit ? "text-ludo-danger" : "text-ludoAltText"}`}
              >
                {currentProjects}/{maxProjects}
              </span>
              <CreateProjectDialog
                hash={uuid()}
                open={createProjectOpen}
                close={() => closeCreateProject()}
              >
                <LudoButton
                  data-testid="create-project-dialog-button"
                  className="h-10 px-5 rounded-lg text-sm font-semibold gap-2"
                  variant="alt"
                  shadow={true}
                  onClick={() => {
                    if (isAtLimit) {
                      if (!paymentsFeature) return;
                      router.navigate(
                        ludoNavigation.subscription.toSubscriptionComparisonPage(),
                      );
                    } else {
                      openCreateProject();
                    }
                  }}
                  title={isAtLimit ? "Project limit reached" : undefined}
                >
                  {!isAtLimit && <PlusIcon className="h-4 w-4" />}
                  {isAtLimit && paymentsFeature
                    ? "Upgrade"
                    : isAtLimit
                      ? "At Limit"
                      : "New Project"}
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
