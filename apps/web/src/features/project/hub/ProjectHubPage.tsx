import { Gutter } from "@ludocode/design-system/layouts/grid/gutter";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { ProjectCard } from "@/features/project/hub/components/ProjectCard.tsx";
import {
  ProjectLauncher,
  ProjectQuota,
  type TemplateKey,
} from "@/features/project/hub/components/ProjectLauncher.tsx";
import { ProjectTemplates } from "@/features/project/hub/components/projectTemplates.ts";
import { projectMastheadContent } from "@/features/project/hub/content.ts";
import {
  PageMasthead,
  SectionHeading,
} from "@ludocode/design-system/zones/page-masthead.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { PaginationBar } from "@/features/hub/components/PaginationBar.tsx";
import { usePagination } from "@ludocode/hooks";
import { router } from "@/main.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { Route } from "@/routes/app/_hub/projects.tsx";
import type { ProjectCardResponse } from "@ludocode/types";
import { testIds } from "@ludocode/util/test-ids";
import { useCreateProject } from "@/queries/mutations/projectMutations";

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

  const paymentsFeature = useSuspenseQuery(qo.activeFeatures()).data
    .paymentsEnabled;

  const { maxProjects } = useSuspenseQuery(qo.subscription()).data;
  const currentProjects = allProjects.length;

  const isAtLimit = currentProjects >= maxProjects;
  const createProjectMutation = useCreateProject();

  const toUpgrade = () =>
    router.navigate(ludoNavigation.subscription.toSubscriptionComparisonPage());

  const createFromTemplate = (templateKey: TemplateKey) => {
    if (isAtLimit) {
      if (paymentsFeature) {
        toUpgrade();
      }
      return;
    }

    const template = ProjectTemplates[templateKey];
    createProjectMutation.mutate({
      ...template,
      requestHash: crypto.randomUUID(),
    });
  };

  return (
    <div className="layout-grid col-span-full scrollable py-6 px-6 lg:px-0">
      <Gutter desktopOnly />
      <div className="relative col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0 pb-6">
        <PageMasthead {...projectMastheadContent}>
          <ProjectQuota
            used={currentProjects}
            max={maxProjects}
            isAtLimit={isAtLimit}
          />
        </PageMasthead>

        <div className="flex flex-col gap-4">
          <SectionHeading label="New project">
            {isAtLimit && paymentsFeature && (
              <LudoButton
                data-testid={testIds.projectHub.upgradeLimitButton}
                className="h-8 w-fit shrink-0 px-4 text-xs font-semibold"
                variant="alt"
                shadow={false}
                onClick={toUpgrade}
              >
                Upgrade
              </LudoButton>
            )}
          </SectionHeading>

          <ProjectLauncher
            isAtLimit={isAtLimit}
            isPending={createProjectMutation.isPending}
            onCreate={createFromTemplate}
          />
        </div>

        <div className="flex flex-col gap-4">
          <SectionHeading label="Saved projects" />

          {allProjects.length === 0 ? (
            <EmptyProjects />
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {allProjects.map((project: ProjectCardResponse) => (
                <ProjectCard
                  currentUserId={currentUser.id}
                  key={project.projectId}
                  project={project}
                  mode={"OWN"}
                />
              ))}
            </div>
          )}
        </div>

        <PaginationBar
          page={currentPage}
          totalPages={projectsPacket.totalPages}
          hasNext={projectsPacket.hasNext}
          onPrev={() => prev()}
          onNext={() => next(projectsPacket.hasNext)}
        />
      </div>
      <Gutter />
    </div>
  );
}

function EmptyProjects() {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ludo-surface p-8 text-center">
      <p className="text-sm font-semibold text-ludo-white-bright">
        Nothing on the bench yet
      </p>
      <p className="max-w-xs text-xs leading-relaxed text-ludo-white-dim">
        Pick a stack above and your first project lands right here.
      </p>
    </div>
  );
}
