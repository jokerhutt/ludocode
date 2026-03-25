import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  entryFileId: string;
  debounceMs: number;
  enabled?: boolean;
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
  enabled = true,
}: Args): SaveStatusType {
  const queryClient = useQueryClient();
  const currentPayload = serializeProjectPayload({
    projectId: project.projectId,
    projectLanguage: project.projectLanguage,
    projectName: project.projectName,
    files,
    entryFilePath: entryFileId,
  });
  const latestPayloadRef = useRef<string>(currentPayload);
  const lastSavedPayloadRef = useRef<string>(currentPayload);
  const lastSavedAtRef = useRef<Date | null>(null);

  const projectId = project.projectId;
  const previousProjectIdRef = useRef(projectId);

  const saveMutation = useMutation({
    ...mutations.saveProject(),
    onSuccess: (savedProject, variables) => {
      const savedPayload = serializeProjectPayload(variables);
      if (savedPayload !== latestPayloadRef.current) return;

      queryClient.setQueryData(
        qk.project(savedProject.projectId),
        savedProject,
      );
      lastSavedPayloadRef.current = savedPayload;
      lastSavedAtRef.current = new Date();
    },
  });
  const { mutate } = saveMutation;

  useEffect(() => {
    latestPayloadRef.current = currentPayload;
  }, [currentPayload]);

  useEffect(() => {
    if (previousProjectIdRef.current === projectId) return;

    previousProjectIdRef.current = projectId;
    latestPayloadRef.current = currentPayload;
    lastSavedPayloadRef.current = currentPayload;
    lastSavedAtRef.current = null;
  }, [currentPayload, projectId]);

  useEffect(() => {
    if (!projectId || !enabled) return;
    if (files.length <= 0) return;

    if (!files.some((f) => f.path === entryFileId)) return;

    if (currentPayload === lastSavedPayloadRef.current) return;

    const timeoutId = setTimeout(() => {
      mutate({
        projectId,
        projectLanguage: project.projectLanguage,
        projectName: project.projectName,
        files: files,
        entryFilePath: entryFileId,
      });
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [
    currentPayload,
    debounceMs,
    enabled,
    entryFileId,
    files,
    mutate,
    project.projectLanguage,
    project.projectName,
    projectId,
  ]);

  return {
    isSaving: saveMutation.isPending,
    isSaved:
      !saveMutation.isPending &&
      !saveMutation.isError &&
      currentPayload === lastSavedPayloadRef.current,
    error: saveMutation.error,
    lastSavedAt: lastSavedAtRef.current,
  };
}

function serializeProjectPayload(snapshot: ProjectSnapshot) {
  return JSON.stringify(snapshot);
}
