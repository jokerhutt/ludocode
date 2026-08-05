import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { Discussion, DiscussionTopic, MessageLikeCountResponse } from "@ludocode/types";

export function useCreateDiscussionMessage(
  entityId: string,
  topic: DiscussionTopic,
) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createDiscussionMessage(),
    onSuccess: (response) => {
      qc.setQueryData(qk.discussion(entityId, topic), (old: Discussion) => {
        if (!old) return old;

        return {
          ...old,
          discussionId: response.discussionId,
          children: [...old.children, response],
        };
      });
    },
  });
}

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

export function useUnlikeMessage(messageId: string) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.unlikeMessage(messageId),
    onSuccess: (likeResponse) => {
      qc.setQueryData<MessageLikeCountResponse>(
        qk.messageLike(messageId),
        (prevLikeState) => {
          if (likeResponse) return likeResponse;

          return {
            id: prevLikeState?.id ?? messageId,
            count: Math.max(0, (prevLikeState?.count ?? 0) - 1),
            likedByMe: false,
          };
        },
      );
    },
  });
}
