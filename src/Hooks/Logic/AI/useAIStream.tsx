import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { EventSourcePolyfill } from "event-source-polyfill";
import type { ChatMessage } from "@/Types/AI/AIMessagePart";

export function useAIStream(url: string | null) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<ChatMessage | null>(null);

  // ref to ALWAYS hold latest message
  const streamingRef = useRef<ChatMessage | null>(null);

  useEffect(() => {
    if (!url) return;

    setStreamingMessage(null);
    streamingRef.current = null;

    const es = new EventSourcePolyfill(url, { withCredentials: true });

    es.onmessage = (e: any) => {
      const chunk = JSON.parse(e.data);

      setStreamingMessage((prev) => {
        const next: ChatMessage =
          prev === null
            ? { id: chunk.id, role: chunk.role, parts: [chunk.part] }
            : prev.id === chunk.id
            ? { ...prev, parts: [...prev.parts, chunk.part] }
            : { id: chunk.id, role: chunk.role, parts: [chunk.part] };

        streamingRef.current = next; // IMPORTANT

        return next;
      });
    };

    es.onerror = () => {
      es.close();

      const final = streamingRef.current;
      if (final) {
        setChatHistory((prev) => [...prev, final]);
      }

      streamingRef.current = null;
      setStreamingMessage(null);
    };

    return () => es.close();
  }, [url]);

  const messages = streamingMessage
    ? [...chatHistory, streamingMessage]
    : chatHistory;

  return { messages };
}