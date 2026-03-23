import { type DiscussionTopic } from "./Discussion";

export type CreateDiscussionMessageRequest = {
    entityId: string;
    discussionTopic: DiscussionTopic;
    parentId: string | null;
    content: string;
}