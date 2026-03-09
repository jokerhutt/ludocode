export type FeedbackType = "GENERAL" | "EXERCISE" | "PROJECT"

export type FeedbackRequest = {
  content: string;
  feedbackType: FeedbackType
  entityId?: string;
};
