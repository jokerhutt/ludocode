import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { useCallback } from "react";
import { useToggleLike } from "@/queries/mutations/useToggleLike.ts";

export function useCreateProject(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createProject(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.projects() });
      closeModal?.();
    },
  });
}

export function useRenameProject(pid: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.renameProject(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.projects() });
      qc.invalidateQueries({ queryKey: qk.project(pid) });
    },
  });
}

export function useChangeProjectDescription(pid: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeProjectDescription(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.projects() });
      qc.invalidateQueries({ queryKey: qk.project(pid) });
    },
  });
}

export function useChangeProjectVisibility(pid: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeProjectVisibility(pid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.projects() });
      qc.invalidateQueries({ queryKey: qk.project(pid) });
    },
  });
}

export function useDeleteProject(pid: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteProject(pid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.projects() });
      qc.removeQueries({ queryKey: qk.project(pid) });
    },
  });
}

export function useModifyProject(projectId: string) {
  const renameProjectMutation = useRenameProject(projectId);
  const deleteProjectMutation = useDeleteProject(projectId);
  const changeDescriptionMutation = useChangeProjectDescription(projectId);

  const handleRenameProject = useCallback(
    (oldName: string, newName: string) => {
      if (oldName === newName) return;
      renameProjectMutation.mutate({ targetId: projectId, newName: newName });
    },
    [projectId, renameProjectMutation],
  );

  const handleChangeProjectDescription = useCallback(
    (oldDescription: string, newDescription: string) => {
      if (oldDescription === newDescription) return;
      changeDescriptionMutation.mutate({
        targetId: projectId,
        newDescription: newDescription,
      });
    },
    [projectId, changeDescriptionMutation],
  );

  const handleDeleteProject = useCallback(() => {
    deleteProjectMutation.mutate();
  }, [deleteProjectMutation]);

  return {
    handleRenameProject,
    handleChangeProjectDescription,
    handleDeleteProject,
  };
}

interface UseDuplicateProjectOptions {
  onSuccess?: (newProjectId: string) => void | Promise<void>;
}

export function useDuplicateProject(
  pid: string,
  options?: UseDuplicateProjectOptions,
) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.duplicateProject(pid),
    onSuccess: async (newProjectId) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.projects() }),
        qc.invalidateQueries({ queryKey: qk.project(pid) }),
      ]);

      await options?.onSuccess?.(newProjectId);
    },
  });
}

export function useLikeProject(projectId: string) {
  return useToggleLike({
    id: projectId,
    liked: true,
    queryKey: qk.projectsLike(projectId),
    options: mutations.likeProject(projectId),
    invalidateKeys: [qk.projectsCommunity()],
  });
}

export function useUnlikeProject(projectId: string) {
  return useToggleLike({
    id: projectId,
    liked: false,
    queryKey: qk.projectsLike(projectId),
    options: mutations.unlikeProject(projectId),
    invalidateKeys: [qk.projectsCommunity()],
  });
}
