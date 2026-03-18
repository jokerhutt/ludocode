import { mutations } from "@/queries/definitions/mutations.ts";
import type { ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  entryFileId: string;
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
  entryFileId,
  debounceMs = 1000,
}: Args): SaveStatusType {
  const hasSavedOnceRef = useRef(false);

  const lastPayloadRef = useRef<string | null>(null);
  const lastSavedAtRef = useRef<Date | null>(null);

  const projectId = project.projectId;

  const saveMutation = useMutation({
    ...mutations.saveProject(),
    onSuccess: () => {
      lastSavedAtRef.current = new Date();
      hasSavedOnceRef.current = true;
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
        visibility: project.visibility,
        entryFileId,
      });
    }, debounceMs, entryFileId);

    return () => clearTimeout(timeoutId);
  }, [projectId, files, debounceMs, saveMutation]);

  return {
    isSaving: saveMutation.isPending,
    isSaved: !saveMutation.isPending && !saveMutation.isError,
    error: saveMutation.error,
    lastSavedAt: lastSavedAtRef.current,
  };
}
