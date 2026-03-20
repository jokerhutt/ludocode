import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { ProjectLikeResponse } from "@ludocode/types";

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
