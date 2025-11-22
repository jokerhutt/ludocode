export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  parts: AIMessagePart[];
};

export type AIMessagePart = {
  type: "text" | "reasoning";
  text: string;
};
