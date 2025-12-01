import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import type { ProjectListResponse } from "@/types/Project/ProjectListResponse";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { useCallback } from "react";

export function useRenameProject() {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.reameProject(),
    onSuccess: (payload: ProjectListResponse) => {
      qc.setQueryData(qk.projects(), payload);
    },
  });
}

export function useDeleteProject(pid: string) {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.deleteProject(pid),
    onSuccess: (payload: ProjectListResponse) => {
      qc.setQueryData(qk.projects(), payload);
    },
  });
}

export function useModifyProject(projectId: string) {
  const renameProjectMutation = useRenameProject();
  const deleteProjectMutation = useDeleteProject(projectId);

  const handleRenameProject = useCallback(
    (oldName: string, newName: string) => {
      if (oldName === newName) return;
      renameProjectMutation.mutate({ targetId: projectId, newName: newName });
    },
    [projectId, renameProjectMutation]
  );

  const handleDeleteProject = useCallback(() => {
    deleteProjectMutation.mutate(null);
  }, [deleteProjectMutation]);

  return {
    handleRenameProject,
    handleDeleteProject,
  };
}
