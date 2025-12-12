import { ProjectProvider } from "@/hooks/Context/Project/ProjectContext";
import { ProjectPage } from "@/features/Project/ProjectPage";
import { getRouteApi, useLoaderData } from "@tanstack/react-router";
import { ProjectHeader } from "@/features/Project/Header/ProjectHeader";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";

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
