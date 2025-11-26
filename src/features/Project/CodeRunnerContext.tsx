import {
  useRunner,
  type useRunnerResponse,
} from "@/Hooks/Logic/Project/useRunner";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const CodeRunnerContext = createContext<useRunnerResponse | null>(null);

type CodeRunnerProviderProps = {
  children: ReactNode;
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
};

export function CodeRunnerProvider({
  children,
  project,
  files,
}: CodeRunnerProviderProps) {
  const runner = useRunner({ project, files });

  return (
    <CodeRunnerContext.Provider value={runner}>
      {children}
    </CodeRunnerContext.Provider>
  );
}

export function useCodeRunnerContext() {
  const ctx = useContext(CodeRunnerContext);
  if (!ctx)
    throw new Error("useCodeRunner must be used inside <CodeRunnerProvider>");
  return ctx;
}
