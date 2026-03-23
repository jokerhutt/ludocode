import { DiscussionMessage } from "./DiscussionMessage";

export type Discussion = {
  id: string | null;
  entityId: string;
  discussionTopic: DiscussionTopic;
  children: DiscussionMessage[];
};

export type DiscussionTopic = "EXERCISE" | "PROJECT";
