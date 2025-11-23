import { useLayoutEffect, useRef } from "react";

export function useAutoWidth(value: string) {
    
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (!spanRef.current || !inputRef.current) return;
    const width = Math.max(spanRef.current.offsetWidth + 5, 32);
    inputRef.current.style.width = `${width}px`;
  }, [value]);

  return {spanRef, inputRef}


}
