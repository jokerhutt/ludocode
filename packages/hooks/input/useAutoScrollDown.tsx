import type { UIDataTypes, UIMessage, UITools } from "ai";
import { useEffect, useRef } from "react";

type Args = { messages: UIMessage<unknown, UIDataTypes, UITools>[] };

export function useAutoScrollDown({ messages }: Args) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return { scrollRef };
}
