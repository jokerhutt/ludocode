import { mutations } from "@/Hooks/Queries/Definitions/mutations";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import type { SaveProjectPayload } from "@/Types/Playground/SaveProjectPayload";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { ProjectFile } from "./useProject";

type Args = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[]
  debounceMs: number;
};

export function useAutoSaveProject({ project, files, debounceMs = 1000 }: Args) {
  const lastPayloadRef = useRef<string | null>(null);

  const projectId = project.projectId;

  const saveMutation = useMutation(mutations.saveProject(projectId));

  useEffect(() => {
    if (!projectId) return;
    if (files.length <= 0) return;

    const payloadString = JSON.stringify(files);
    if (payloadString === lastPayloadRef.current) return;
    lastPayloadRef.current = payloadString;

    const timeoutId = setTimeout(() => {
      saveMutation.mutate({projectId: project.projectId, projectName: project.projectName, files: files});
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [projectId, files, debounceMs, saveMutation]);
}
