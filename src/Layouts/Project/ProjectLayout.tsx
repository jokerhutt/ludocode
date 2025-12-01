import { ProjectProvider } from "@/Hooks/Context/Project/ProjectContext";
import { ProjectPage } from "@/features/Project/ProjectPage";
import { useLoaderData } from "@tanstack/react-router";
import { projectRoute } from "@/routes/router";
import { ProjectHeader } from "@/features/Project/Header/ProjectHeader";
import { MainGridWrapper } from "@/components/LudoComponents/Layouts/Grids/MainGridWrapper";

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
