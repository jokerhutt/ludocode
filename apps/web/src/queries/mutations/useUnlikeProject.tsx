import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { ProjectLikeResponse } from "@ludocode/types";

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
