import type { ChatMessage } from "@/Types/AI/AIMessagePart";
import { useEffect, useRef } from "react";

type Args = { messages: ChatMessage[] | null };

export function useAutoScrollDown({ messages }: Args) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return {scrollRef}

}
