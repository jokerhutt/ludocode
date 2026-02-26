import { useLayoutEffect, useRef } from "react";

export function useAutoWidth(value: string, minWidth = 48) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (!spanRef.current || !inputRef.current) return;
    const measured = spanRef.current.offsetWidth + 12;
    const width = Math.max(measured, minWidth);
    inputRef.current.style.width = `${width}px`;
  }, [value, minWidth]);

  return { spanRef, inputRef };
}
