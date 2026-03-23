import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../definitions/mutations";
import { qk } from "../definitions/qk";
import type { Discussion, DiscussionTopic } from "@ludocode/types";

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
