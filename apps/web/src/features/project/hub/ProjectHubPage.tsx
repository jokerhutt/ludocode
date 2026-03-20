import { uuid } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { ProjectCard } from "@/features/project/hub/components/ProjectCard.tsx";
import { CreateProjectDialog } from "@/features/project/hub/components/CreateProjectDialog.tsx";
import { projectHeroContent } from "@/features/project/hub/content.ts";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { useModal, usePagination } from "@ludocode/hooks";
import { router } from "@/main.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { Route } from "@/routes/app/_hub/projects.tsx";
import { PlusIcon } from "lucide-react";
import type { ProjectCardResponse } from "@ludocode/types";

export function ProjectHubPage() {
  const { page } = Route.useSearch();
  const {
    page: currentPage,
    next,
    prev,
  } = usePagination(page, (nextPage) => {
    if (nextPage === page) return;

    router.navigate({
      to: Route.to,
      search: (prevSearch) => ({ ...prevSearch, page: nextPage }),
    });
  });
  const { data: currentUser } = useSuspenseQuery(qo.currentUser());
  const { data: projectsPacket } = useSuspenseQuery(
    qo.userProjects(currentUser.id, currentPage, 10),
  );
  const allProjects = projectsPacket.projects;
  const isFirstPage = currentPage === 0;

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
        <div className="col-span-1 hidden lg:block" />
        <div className="relative col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0">
          <Hero {...projectHeroContent}>
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-2 sm:gap-3">
              <span
                data-testid="project-limits"
                className={`inline-flex h-10 items-center rounded-lg border px-3 text-xs font-semibold tabular-nums ${
                  isAtLimit
                    ? "border-ludo-danger/30 bg-ludo-danger/10 text-ludo-danger"
                    : "border-ludo-white/15 bg-ludo-white/5 text-ludo-white/85"
                }`}
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
                  className="h-10 px-4 rounded-lg text-sm font-semibold gap-2 whitespace-nowrap"
                  variant="alt"
                  shadow={false}
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
                  title={isAtLimit ? "project limit reached" : undefined}
                >
                  {!isAtLimit && <PlusIcon className="h-4 w-4" />}
                  {isAtLimit && paymentsFeature
                    ? "Upgrade"
                    : isAtLimit
                      ? "At Limit"
                      : "New project"}
                </LudoButton>
              </CreateProjectDialog>
            </div>
          </Hero>

          <div className="grid lg:grid-cols-3 gap-8 min-h-50">
            {allProjects.map((project: ProjectCardResponse) => (
              <ProjectCard
                currentUserId={currentUser.id}
                key={project.projectId}
                project={project}
                mode={"OWN"}
              />
            ))}
          </div>
          {projectsPacket.totalPages > 1 && (
            <div className="flex items-center justify-end gap-3">
              <LudoButton
                className="h-9 px-4 w-fit text-sm"
                clickable={!isFirstPage}
                disabled={isFirstPage}
                onClick={() => prev()}
              >
                Previous
              </LudoButton>
              <span className="text-xs font-medium tabular-nums text-ludo-white">
                Page {currentPage + 1}
              </span>
              <LudoButton
                className="h-9 px-4 w-fit text-sm"
                clickable={projectsPacket.hasNext}
                disabled={!projectsPacket.hasNext}
                onClick={() => next(projectsPacket.hasNext)}
              >
                Next
              </LudoButton>
            </div>
          )}
        </div>
        <div className="col-span-1" />
      </div>
    </>
  );
}
