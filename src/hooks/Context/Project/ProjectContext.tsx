import {
  useProject,
  type UseProjectResponse,
} from "@/hooks/Flows/Project/useProject";
import type { ProjectSnapshot } from "@/types/Project/ProjectSnapshot";
import { createContext, useContext, type ReactNode } from "react";

const ProjectContext = createContext<UseProjectResponse | null>(null);

type ProjectProviderProps = {
  children: ReactNode;
  project: ProjectSnapshot;
};

export function ProjectProvider({ children, project }: ProjectProviderProps) {
  const projectState = useProject({ project });

  return (
    <ProjectContext.Provider value={projectState}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProjectContext must be used inside <ProjectProvider>");
  return ctx;
}
