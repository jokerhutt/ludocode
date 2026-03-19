import { qo } from "@/queries/definitions/queries.ts";
import { Route } from "@/routes/app/_hub/community/index";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Hero } from "@ludocode/design-system/zones/hero.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon.tsx";
import { usePagination } from "@ludocode/hooks";
import type { ProjectCardResponse } from "@ludocode/types";
import { parseToDate } from "@ludocode/util";
import { Copy, Heart } from "lucide-react";
import { useDuplicateProject } from "@/queries/mutations/useDuplicateProject";

export function CommunityPage() {
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

  const { data: projectsPacket } = useSuspenseQuery(
    qo.communityProjects(currentPage, 10),
  );
  const { data: currentUser } = useQuery(qo.currentUser());
  const currentUserId = currentUser?.id;
  const publicProjects = projectsPacket.projects;
  const isFirstPage = currentPage === 0;

  return (
    <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
      <div className="col-span-1 hidden lg:block" />
      <div className="col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0">
        <Hero
          title="Community Projects"
          subtitle="Browse and explore projects shared by the Ludocode community"
        />

        {publicProjects.length === 0 ? (
          <div className="rounded-xl bg-ludo-surface-dim border border-ludo-background p-8 text-center">
            <h2 className="text-xl font-bold text-ludo-white-bright">
              No public projects yet
            </h2>
            <p className="mt-2 text-sm text-ludo-white-bright/70">
              There isn&apos;t any shared project yet. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 min-h-[200px]">
            {publicProjects.map((project: ProjectCardResponse) => (
              <PublicProjectCard
                key={project.projectId}
                project={project}
                userId={currentUserId}
              />
            ))}
          </div>
        )}

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
      <div className="col-span-1 hidden lg:block" />
    </div>
  );
}

function PublicProjectCard({
  project,
  userId,
}: {
  project: ProjectCardResponse;
  userId?: string;
}) {
  const { projectId, projectTitle, authorId, updatedAt, languageIconName } =
    project;
  const iconName = languageIconName as IconName;
  const createdAtTime = updatedAt ? parseToDate(updatedAt) : "-";
  const { data: author } = useQuery(qo.user(authorId));
  const authorDisplayName = author?.displayName?.trim() || "Anonymous";

  const duplicateMutation = useDuplicateProject(projectId, {
    onSuccess: async (newProjectId) => {
      if (!userId) return;

      router.navigate(ludoNavigation.project.toProject(userId, newProjectId));
    },
  });

  const canDuplicate = Boolean(userId);

  return (
    <LudoButton
      data-testid={`project-hub-card`}
      onClick={() => {
        router.navigate(ludoNavigation.project.toProject(authorId, projectId));
      }}
      className="w-full h-24 flex items-start text-ludo-white-bright hover:cursor-pointer justify-between p-4"
    >
      <div className="w-full h-full items-start text-ludo-white-bright flex gap-4">
        <div className="flex flex-col gap-1.5 text-start">
          <p className="m-0 text-lg leading-tight">{projectTitle}</p>
          <p className="m-0 text-xs text-ludo-white leading-tight">
            By {authorDisplayName}
          </p>
          <p className="m-0 text-xs text-ludo-white leading-tight text-start">
            {createdAtTime}
          </p>
        </div>
      </div>
      <div className="flex h-full flex-col items-end justify-between">
        <div className="flex items-center gap-2 justify-end">
          <CustomIcon iconName={iconName} color="white" className="h-5 pr-1" />
        </div>
        <div className="flex justify-end gap-2 items-end text-ludo-white ">
          {canDuplicate && (
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                duplicateMutation.mutate();
              }}
              className={
                duplicateMutation.isPending
                  ? "hover:cursor-not-allowed"
                  : "hover:cursor-pointer"
              }
            >
              <Copy className="h-4" />
            </button>
          )}
          <div className="flex items-end text-ludo-white justify-end gap-0.5">
            <Heart className="h-4" />
            <p className="text-sm leading-none m-0">0</p>
          </div>
        </div>
      </div>
    </LudoButton>
  );
}
