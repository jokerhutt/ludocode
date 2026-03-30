import { useAutoSaveProject } from "@/features/project/hooks/useAutoSaveProject.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AutoSaveContextValue = {
  isSaving: boolean;
  isSaved: boolean;
  error: Error | null;
  lastSavedAt: Date | null;
  saveSuccessCount: number;
};

const AutoSaveContext = createContext<AutoSaveContextValue | null>(null);

type AutoSaveProviderProps = {
  children: ReactNode;
  enabled: boolean;
  debounceMs?: number;
};

export function AutoSaveProvider({
  children,
  enabled,
  debounceMs = 1000,
}: AutoSaveProviderProps) {
  const { project, files, entryFileId } = useProjectContext();
  const saveStatus = useAutoSaveProject({
    enabled,
    project,
    files,
    entryFileId,
    debounceMs,
  });

  const [saveSuccessCount, setSaveSuccessCount] = useState(0);
  const lastSavedMsRef = useRef<number | null>(null);

  useEffect(() => {
    const savedMs = saveStatus.lastSavedAt?.getTime() ?? null;
    if (savedMs == null || savedMs === lastSavedMsRef.current) return;

    lastSavedMsRef.current = savedMs;
    setSaveSuccessCount((prev) => prev + 1);
  }, [saveStatus.lastSavedAt]);

  return (
    <AutoSaveContext.Provider value={{ ...saveStatus, saveSuccessCount }}>
      {children}
    </AutoSaveContext.Provider>
  );
}

export function useAutoSaveContext(): AutoSaveContextValue {
  const ctx = useContext(AutoSaveContext);
  if (!ctx) {
    throw new Error(
      "useAutoSaveContext must be used inside <AutoSaveProvider>",
    );
  }
  return ctx;
}
