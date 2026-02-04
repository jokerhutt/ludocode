import { ProjectProvider } from "@/features/Project/Context/ProjectContext.tsx";
import { ProjectPage } from "@/features/Project/ProjectPage.tsx";
import { getRouteApi, useLoaderData } from "@tanstack/react-router";
import { ProjectHeader } from "@/features/Project/Zone/ProjectHeader.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { UserPreferencesContext } from "@/hooks/Context/useUserPreferenceContext";

type ProjectLayoutProps = {};

export function ProjectLayout({}: ProjectLayoutProps) {
  const routeApi = getRouteApi("/_app/_desktopguard/project/$projectId");
  const { project } = useLoaderData({ from: routeApi.id });
  const { data: UserPreferences } = useSuspenseQuery(qo.preferences());

  return (
    <UserPreferencesContext.Provider value={UserPreferences}>
      <ProjectProvider project={project}>
        <MainGridWrapper className="max-h-dvh min-h-0" gridRows="SITE">
          <ProjectHeader />
          <ProjectPage />
        </MainGridWrapper>
      </ProjectProvider>
    </UserPreferencesContext.Provider>
  );
}
