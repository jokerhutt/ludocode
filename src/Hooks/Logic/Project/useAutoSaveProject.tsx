import { mutations } from "@/Hooks/Queries/Definitions/mutations";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  debounceMs: number;
};

export type SaveStatusType = {
  isSaving: boolean;
  isSaved: boolean;
  error: Error | null;
  lastSavedAt: Date | null;
};

export function useAutoSaveProject({
  project,
  files,
  debounceMs = 1000,
}: Args): SaveStatusType {
  const lastPayloadRef = useRef<string | null>(null);
  const lastSavedAtRef = useRef<Date | null>(null);

  const projectId = project.projectId;

  const saveMutation = useMutation({
    ...mutations.saveProject(),
    onSuccess: () => {
      lastSavedAtRef.current = new Date();
    },
  });

  useEffect(() => {
    if (!projectId) return;
    if (files.length <= 0) return;

    const payloadString = JSON.stringify(files);
    if (payloadString === lastPayloadRef.current) return;
    lastPayloadRef.current = payloadString;

    const timeoutId = setTimeout(() => {
      saveMutation.mutate({
        projectId: project.projectId,
        projectLanguage: project.projectLanguage,
        projectName: project.projectName,
        files: files,
      });
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [projectId, files, debounceMs, saveMutation]);

  return {
    isSaving: saveMutation.isPending,
    isSaved: saveMutation.isSuccess,
    error: saveMutation.error,
    lastSavedAt: lastSavedAtRef.current,
  };
}
