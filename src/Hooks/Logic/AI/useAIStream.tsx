import { useEffect, useRef, useState } from "react";
//@ts-ignore
import { EventSourcePolyfill } from "event-source-polyfill";
import type { ChatMessage } from "@/Types/AI/AIMessagePart";

export function useAIStream(url: string | null) {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [streamingMessage, setStreamingMessage] = useState<ChatMessage | null>(
    null
  );
  const streamingRef = useRef<ChatMessage | null>(null);

  useEffect(() => {
    if (!url) return;

    streamingRef.current = null;
    setStreamingMessage(null);

    const es = new EventSourcePolyfill(url, { withCredentials: true });

    es.onmessage = (e: MessageEvent) => {
      if (!e.data || e.data === "[DONE]") return;

      const incoming: ChatMessage = JSON.parse(e.data);

      if (!streamingRef.current || streamingRef.current.id !== incoming.id) {
        streamingRef.current = { ...incoming, parts: incoming.parts ?? [] };
        setStreamingMessage(streamingRef.current);
        return;
      }

      const current = streamingRef.current;

      const mergedParts = current.parts.map((part) => {
        if (part.type !== "text") return part;

        const incomingTextPart = incoming.parts.find((p) => p.type === "text");
        if (!incomingTextPart || incomingTextPart.type !== "text") return part;

        return {
          ...part,
          text: part.text + incomingTextPart.text,
        };
      });

      const newNonTextParts = incoming.parts.filter(
        (p) =>
          p.type !== "text" && !current.parts.some((cp) => cp.type === p.type)
      );

      const nextMessage: ChatMessage = {
        ...current,
        parts: [...mergedParts, ...newNonTextParts],
      };

      streamingRef.current = nextMessage;
      setStreamingMessage(nextMessage);
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

    return () => {
      es.close();
    };
  }, [url]);

  const messages = streamingMessage
    ? [...chatHistory, streamingMessage]
    : chatHistory;

  const addUserMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      parts: [{ type: "text", text }],
    };
    setChatHistory((prev) => [...prev, userMessage]);
  };

  return { messages, addUserMessage };
}
