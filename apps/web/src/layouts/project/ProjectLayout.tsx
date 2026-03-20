import { ProjectProvider } from "@/features/project/workbench/context/ProjectContext.tsx";
import { WorkbenchPage } from "@/features/project/workbench/WorkbenchPage.tsx";
import { getRouteApi, useLoaderData } from "@tanstack/react-router";
import { ProjectHeader } from "@/features/project/workbench/zones/ProjectHeader.tsx";
import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper.tsx";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";
import { UserPreferencesContext } from "@/features/user/context/useUserPreferenceContext.tsx";
import type { UserPreferences } from "@ludocode/types";

type ProjectLayoutProps = {};

export type ProjectMode = "EDIT" | "READONLY";

export function ProjectLayout({}: ProjectLayoutProps) {
  const routeApi = getRouteApi("/project/$authorId/$projectId");
  const { project } = useLoaderData({ from: routeApi.id });
  const { data: currentUser } = useQuery(qo.currentUser());
  const { data: UserPreferences } = useQuery(qo.preferences());

  const preferences: UserPreferences = UserPreferences ?? {
    userId: "",
    hasExperience: false,
    chosenPath: { careerType: "DATA", title: "", description: "", topPath: "" },
    aiEnabled: false,
    audioEnabled: true,
  };

  const { authorId } = routeApi.useParams();

  const mode: ProjectMode = authorId === currentUser?.id ? "EDIT" : "READONLY";
  const isReadOnly = mode === "READONLY" || !!project.deleteAt;

  return (
    <UserPreferencesContext.Provider value={preferences}>
      <ProjectProvider project={project}>
        <MainGridWrapper className="max-h-dvh min-h-0" gridRows="SITE">
          <ProjectHeader authenticated={!!currentUser} mode={mode} />
          <WorkbenchPage readOnly={isReadOnly} authenticated={!!currentUser} />
        </MainGridWrapper>
      </ProjectProvider>
    </UserPreferencesContext.Provider>
  );
}
