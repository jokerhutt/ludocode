import {
  useRunner,
  type useRunnerResponse,
} from "@/features/project/hooks/useRunner.tsx";
import type { ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const CodeRunnerContext = createContext<useRunnerResponse | null>(null);

type CodeRunnerProviderProps = {
  children: ReactNode;
  disabled?: boolean;
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  entryFileId: string;
};

export function CodeRunnerProvider({
  children,
  project,
  disabled,
  files,
  entryFileId,
}: CodeRunnerProviderProps) {
  const runner = useRunner({ project, files, disabled, entryFileId });

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
