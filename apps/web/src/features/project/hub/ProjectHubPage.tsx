import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { ProjectCard } from "@/features/project/hub/components/ProjectCard.tsx";
import { ProjectTemplates } from "@/features/project/hub/components/projectTemplates.ts";
import { projectHeroContent } from "@/features/project/hub/content.ts";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import { usePagination } from "@ludocode/hooks";
import { router } from "@/main.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { Route } from "@/routes/app/_hub/projects.tsx";
import type { ProjectCardResponse } from "@ludocode/types";
import { useCreateProject } from "@/queries/mutations/useCreateProject.tsx";
import { CustomIcon } from "@ludocode/design-system/primitives/custom-icon.tsx";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot.ts";

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
  const createProjectMutation = useCreateProject();

  const templateButtons = [
    { key: "lua", label: "Lua", iconName: Languages.lua.iconName },
    { key: "python", label: "Python", iconName: Languages.python.iconName },
    { key: "web", label: "Static website", iconName: "HTML" as const },
    {
      key: "javascript",
      label: "Javascript",
      iconName: Languages.javascript.iconName,
    },
  ] as const;

  const createFromTemplate = (templateKey: keyof typeof ProjectTemplates) => {
    if (isAtLimit) {
      if (paymentsFeature) {
        router.navigate(
          ludoNavigation.subscription.toSubscriptionComparisonPage(),
        );
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
    <>
      <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
        <div className="col-span-1 hidden lg:block" />
        <div className="relative col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0">
          <Hero {...projectHeroContent}>
            <div className="flex w-full flex-col gap-3">
              <div className="flex w-full items-center gap-2 overflow-x-auto pb-1">
                {templateButtons.map((template) => (
                  <LudoButton
                    key={template.key}
                    data-testid={`create-project-template-${template.key}`}
                    className="inline-flex h-10 w-fit shrink-0 px-4 rounded-lg text-sm font-semibold gap-2 whitespace-nowrap"
                    variant="default"
                    shadow={false}
                    disabled={createProjectMutation.isPending}
                    onClick={() => createFromTemplate(template.key)}
                    title={isAtLimit ? "project limit reached" : undefined}
                  >
                    <CustomIcon
                      color="white"
                      iconName={template.iconName}
                      className="h-4 w-4"
                    />
                    {template.label}
                  </LudoButton>
                ))}
                {isAtLimit && paymentsFeature && (
                  <LudoButton
                    data-testid="upgrade-project-limit-button"
                    className="inline-flex h-10 w-fit shrink-0 px-4 rounded-lg text-sm font-semibold whitespace-nowrap"
                    variant="alt"
                    shadow={false}
                    onClick={() =>
                      router.navigate(
                        ludoNavigation.subscription.toSubscriptionComparisonPage(),
                      )
                    }
                  >
                    Upgrade
                  </LudoButton>
                )}
              </div>

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
