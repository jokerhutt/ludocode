import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { useCallback } from "react";
import type { ProjectCardListResponse } from "@ludocode/types";

export function useRenameProject(pid: string) {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.reameProject(),
    onSuccess: (payload: ProjectCardListResponse) => {
      qc.setQueryData(qk.projects(), payload);
      qc.invalidateQueries({queryKey: qk.project(pid)})
    },
  });
}

export function useDeleteProject(pid: string) {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.deleteProject(pid),
    onSuccess: (payload: ProjectCardListResponse) => {
      qc.setQueryData(qk.projects(), payload);
      qc.removeQueries({ queryKey: qk.project(pid) })
    },
  });
}

export function useModifyProject(projectId: string) {
  const renameProjectMutation = useRenameProject(projectId);
  const deleteProjectMutation = useDeleteProject(projectId);

  const handleRenameProject = useCallback(
    (oldName: string, newName: string) => {
      if (oldName === newName) return;
      renameProjectMutation.mutate({ targetId: projectId, newName: newName });
    },
    [projectId, renameProjectMutation]
  );

  const handleDeleteProject = useCallback(() => {
    deleteProjectMutation.mutate();
  }, [deleteProjectMutation]);

  return {
    handleRenameProject,
    handleDeleteProject,
  };
}
