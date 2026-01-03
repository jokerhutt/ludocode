import { ProjectProvider } from "@/features/Project/Context/ProjectContext.tsx";
import { ProjectPage } from "@/features/Project/ProjectPage.tsx";
import { getRouteApi, useLoaderData } from "@tanstack/react-router";
import { ProjectHeader } from "@/features/Project/Zone/ProjectHeader.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";

type ProjectLayoutProps = {};

export function ProjectLayout({}: ProjectLayoutProps) {
  const routeApi = getRouteApi("/_app/_desktopguard/project/$projectId");
  const { project } = useLoaderData({ from: routeApi.id });

  return (
    <ProjectProvider project={project}>
      <MainGridWrapper className="max-h-dvh min-h-0" gridRows="SITE">
        <ProjectHeader />
        <ProjectPage />
      </MainGridWrapper>
    </ProjectProvider>
  );
}
