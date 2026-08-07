import { Gutter } from "@ludocode/design-system/layouts/grid/gutter";
import { qo } from "@/queries/definitions/queries.ts";
import { Route } from "@/routes/app/_hub/community/index";
import { router } from "@/main.tsx";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  PageMasthead,
  SectionHeading,
} from "@ludocode/design-system/zones/page-masthead.tsx";
import { PaginationBar } from "@/features/hub/components/PaginationBar.tsx";
import { usePagination } from "@ludocode/hooks";
import type { ProjectCardResponse } from "@ludocode/types";
import { ProjectCard } from "../project/hub/components/ProjectCard";

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
    qo.communityProjects(currentPage, 12),
  );
  const { data: currentUser } = useQuery(qo.currentUser());
  const currentUserId = currentUser?.id;
  const publicProjects = projectsPacket.projects;

  return (
    <div className="layout-grid col-span-full scrollable py-6 px-8 lg:px-0">
      <Gutter desktopOnly />
      <div className="col-span-full lg:col-span-10 flex flex-col gap-6 justify-start min-w-0 pb-6">
        <PageMasthead
          eyebrow="Built by learners"
          title="Community"
          subtitle="Look through what everyone else is making, try it out, and make your own copy to try out your own ideas"
        />

        {publicProjects.length === 0 ? (
          <EmptyCommunity />
        ) : (
          <div className="flex flex-col gap-4">
            <SectionHeading label="Recently shared" />

            <div className="grid gap-6 lg:grid-cols-3">
              {publicProjects.map((project: ProjectCardResponse) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  mode="COMMUNITY"
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </div>
        )}

        <PaginationBar
          page={currentPage}
          totalPages={projectsPacket.totalPages}
          hasNext={projectsPacket.hasNext}
          onPrev={() => prev()}
          onNext={() => next(projectsPacket.hasNext)}
        />
      </div>
      <Gutter desktopOnly />
    </div>
  );
}

function EmptyCommunity() {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ludo-surface p-8 text-center">
      <p className="text-sm font-semibold text-ludo-white-bright">
        No public projects yet
      </p>
      <p className="max-w-xs text-xs leading-relaxed text-ludo-white-dim">
        Nobody has shared anything so far. Publish one of yours and it shows up
        here.
      </p>
    </div>
  );
}
