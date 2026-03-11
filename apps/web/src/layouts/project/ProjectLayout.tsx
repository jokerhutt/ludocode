import { ProjectProvider } from "@/features/project/workbench/context/ProjectContext.tsx";
import { WorkbenchPage } from "@/features/project/workbench/WorkbenchPage.tsx";
import { getRouteApi, useLoaderData } from "@tanstack/react-router";
import { ProjectHeader } from "@/features/project/workbench/zones/ProjectHeader.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import { UserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";

type ProjectLayoutProps = {};

export function ProjectLayout({}: ProjectLayoutProps) {
  const routeApi = getRouteApi("/app/_desktopguard/project/$projectId");
  const { project } = useLoaderData({ from: routeApi.id });
  const { data: UserPreferences } = useSuspenseQuery(qo.preferences());

  return (
    <UserPreferencesContext.Provider value={UserPreferences}>
      <ProjectProvider project={project}>
        <MainGridWrapper className="max-h-dvh min-h-0" gridRows="SITE">
          <ProjectHeader />
          <WorkbenchPage />
        </MainGridWrapper>
      </ProjectProvider>
    </UserPreferencesContext.Provider>
  );
}
