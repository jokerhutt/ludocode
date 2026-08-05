import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { useCallback } from "react";
import type { ProjectLikeResponse } from "@ludocode/types";

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

  const handleRenameProject = useCallback(
    (oldName: string, newName: string) => {
      if (oldName === newName) return;
      renameProjectMutation.mutate({ targetId: projectId, newName: newName });
    },
    [projectId, renameProjectMutation],
  );

  const handleDeleteProject = useCallback(() => {
    deleteProjectMutation.mutate();
  }, [deleteProjectMutation]);

  return {
    handleRenameProject,
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
  const qc = useQueryClient();

  return useMutation({
    ...mutations.likeProject(projectId),
    onSuccess: (likeResponse) => {
      qc.setQueryData<ProjectLikeResponse>(
        qk.projectsLike(projectId),
        (prevLikeState) => {
          if (likeResponse) return likeResponse;

          return {
            id: prevLikeState?.id ?? projectId,
            count: (prevLikeState?.count ?? 0) + 1,
            likedByMe: true,
          };
        },
      );
      qc.invalidateQueries({ queryKey: qk.projectsCommunity() });
    },
  });
}

export function useUnlikeProject(projectId: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.unlikeProject(projectId),
    onSuccess: (likeResponse) => {
      qc.setQueryData<ProjectLikeResponse>(
        qk.projectsLike(projectId),
        (prevLikeState) => {
          if (likeResponse) return likeResponse;

          return {
            id: prevLikeState?.id ?? projectId,
            count: Math.max(0, (prevLikeState?.count ?? 0) - 1),
            likedByMe: false,
          };
        },
      );
      qc.invalidateQueries({ queryKey: qk.projectsCommunity() });
    },
  });
}
