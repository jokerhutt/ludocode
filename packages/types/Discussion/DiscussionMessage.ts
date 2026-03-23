export type DiscussionMessage = {
    id: string;
    discussionId: string;
    authorId: string;
    authorName: string;
    parentId: string;
    createdAt: number;
    content: string;
}