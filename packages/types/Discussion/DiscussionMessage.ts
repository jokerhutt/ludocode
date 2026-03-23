export type DiscussionMessage = {
    id: string;
    discussionId: string;
    authorId: string;
    authorName: string;
    parentId: string | null;
    createdAt: number;
    content: string;
}