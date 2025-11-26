import { ProjectProvider } from "@/Hooks/Context/ProjectContext";
import { ProjectPage } from "@/features/Project/ProjectPage";
import { Outlet, useLoaderData } from "@tanstack/react-router";
import { MainGridWrapper } from "./Grids/MainGridWrapper";
import { ProjectHeader } from "@/features/Project/ProjectHeader";
import { projectRoute } from "@/routes/router";

type ProjectLayoutProps = {};

export function ProjectLayout({}: ProjectLayoutProps) {
  const { project } = useLoaderData({ from: projectRoute.id });

  return (
    <ProjectProvider project={project}>
      <MainGridWrapper className="max-h-dvh min-h-0" gridRows="SITE">
        <ProjectHeader />
        <ProjectPage />
      </MainGridWrapper>
    </ProjectProvider>
  );
}
