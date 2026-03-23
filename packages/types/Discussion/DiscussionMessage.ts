export type DiscussionMessage = {
    id: string;
    discussionId: string;
    authorId: string;
    parentId: string;
    createdAt: number;
    content: string;
}