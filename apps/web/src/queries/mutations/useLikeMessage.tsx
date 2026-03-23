import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { MessageLikeCountResponse } from "@ludocode/types";

export function useLikeMessage(messageId: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.likeMessage(messageId),
    onSuccess: (likeResponse) => {
      qc.setQueryData<MessageLikeCountResponse>(
        qk.messageLike(messageId),
        (prevLikeState) => {
          if (likeResponse) return likeResponse;

          return {
            id: prevLikeState?.id ?? messageId,
            count: (prevLikeState?.count ?? 0) + 1,
            likedByMe: true,
          };
        },
      );
    },
  });
}
