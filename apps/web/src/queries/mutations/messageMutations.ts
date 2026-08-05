import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { Discussion, DiscussionTopic } from "@ludocode/types";
import { useToggleLike } from "@/queries/mutations/useToggleLike.ts";

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
  return useToggleLike({
    id: messageId,
    liked: true,
    queryKey: qk.messageLike(messageId),
    options: mutations.likeMessage(messageId),
  });
}

export function useUnlikeMessage(messageId: string) {
  return useToggleLike({
    id: messageId,
    liked: false,
    queryKey: qk.messageLike(messageId),
    options: mutations.unlikeMessage(messageId),
  });
}
