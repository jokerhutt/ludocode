import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { cn } from "@ludocode/design-system/cn-utils.ts";

type PaneResizeHandleProps = {
  width: number | null;
  onResize: (width: number) => void;
  min: number;
  maxFraction: number;
  pane: "left" | "right";
  label: string;
  className?: string;
};

const KEYBOARD_STEP = 16;

export function PaneResizeHandle({
  width,
  onResize,
  min,
  maxFraction,
  pane,
  label,
  className,
}: PaneResizeHandleProps) {
  const handleRef = useRef<HTMLDivElement>(null);
  const initialWidth = useRef<number | null>(null);
  const dragStart = useRef<{ x: number; width: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const paneElement = () => {
    const el = handleRef.current;
    return (
      pane === "left" ? el?.previousElementSibling : el?.nextElementSibling
    ) as HTMLElement | undefined | null;
  };

  const measurePane = () => paneElement()?.getBoundingClientRect().width ?? 0;

  const clamp = (value: number) => {
    const row = handleRef.current?.parentElement?.clientWidth ?? 0;
    if (row <= 0) return value;
    const high = row * maxFraction;
    const low = Math.min(min, initialWidth.current ?? value, high);
    return Math.min(high, Math.max(low, value));
  };

  useLayoutEffect(() => {
    if (width !== null) return;
    const measured = measurePane();
    if (measured <= 0) return;
    initialWidth.current = measured;
    onResize(measured);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const widthRef = useRef(width);
  widthRef.current = width;

  useEffect(() => {
    const row = handleRef.current?.parentElement;
    if (!row) return;

    const observer = new ResizeObserver(() => {
      const current = widthRef.current;
      if (current === null || dragStart.current) return;
      const next = clamp(current);
      if (Math.abs(next - current) > 0.5) onResize(next);
    });

    observer.observe(row);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, maxFraction]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragStart.current = { x: event.clientX, width: width ?? measurePane() };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start) return;
    const delta =
      pane === "left" ? event.clientX - start.x : start.x - event.clientX;
    onResize(clamp(start.width + delta));
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    dragStart.current = null;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div
      ref={handleRef}
      role="separator"
      aria-orientation="vertical"
      aria-label={label}
      aria-valuenow={width ?? undefined}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={(event) => {
        const towards = pane === "left" ? 1 : -1;
        const current = width ?? measurePane();
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          onResize(clamp(current - KEYBOARD_STEP * towards));
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          onResize(clamp(current + KEYBOARD_STEP * towards));
        }
      }}
      className={cn(
        "group hidden lg:block relative z-10 w-0 shrink-0 self-stretch outline-none",
        className,
      )}
    >
      <span className="absolute inset-y-0 -left-1 w-2 cursor-col-resize touch-none select-none">
        <span
          className={cn(
            "absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 transition-colors",
            isDragging
              ? "bg-ludo-accent-muted/40"
              : "bg-transparent group-hover:bg-ludo-accent-muted/20",
          )}
        />
      </span>
    </div>
  );
}
