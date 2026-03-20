import { XIcon } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "../cn-utils";

type LudoSlideOverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "bottom" | "right";
  children: ReactNode;
};

function LudoSlideOverRoot({
  open,
  onOpenChange,
  side = "bottom",
  children,
}: LudoSlideOverProps) {
  const isBottom = side === "bottom";
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startPointerYRef = useRef(0);

  useEffect(() => {
    if (!open) {
      setIsDragging(false);
      setDragOffset(0);
    }
  }, [open]);

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (!isBottom || !open) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select, [data-no-drag]")) {
      return;
    }
    if (!target.closest("[data-ludo-slideover-drag-handle]")) return;

    startPointerYRef.current = event.clientY;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (
    event,
  ) => {
    if (!isBottom || !isDragging) return;

    const nextOffset = Math.max(0, event.clientY - startPointerYRef.current);
    setDragOffset(nextOffset);
  };

  const finishDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    shouldCloseOverride?: boolean,
  ) => {
    if (!isBottom || !isDragging) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const height = event.currentTarget.getBoundingClientRect().height;
    const shouldClose =
      shouldCloseOverride ?? dragOffset > Math.max(80, height * 0.25);

    setIsDragging(false);
    setDragOffset(0);

    if (shouldClose) {
      onOpenChange(false);
    }
  };

  const transform = isBottom
    ? open
      ? `translate3d(0, ${dragOffset}px, 0)`
      : "translate3d(0, 100%, 0)"
    : open
      ? "translate3d(0, 0, 0)"
      : "translate3d(100%, 0, 0)";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 animate-in fade-in duration-200"
          onClick={() => onOpenChange(false)}
        />
      )}

      <div
        className={cn(
          "fixed z-50 bg-ludo-background transition-transform duration-300 ease-out flex flex-col",
          isDragging && "duration-0",
          isBottom
            ? "bottom-0 left-0 right-0 rounded-t-2xl max-h-[70dvh]"
            : "top-0 right-0 h-full w-80 rounded-l-2xl",
        )}
        style={{ transform }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => finishDrag(event)}
        onPointerCancel={(event) => finishDrag(event, false)}
      >
        {children}
      </div>
    </>
  );
}

function Header({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center pt-3 pb-2 px-4 shrink-0 touch-none"
      data-ludo-slideover-drag-handle
    >
      <div className="w-full flex justify-center mb-3">
        <div className="w-10 h-1 rounded-full bg-white/20" />
      </div>
      <div className="w-full flex items-center justify-between">
        <div>{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            data-no-drag
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <XIcon className="w-5 h-5 text-ludo-white-dim" />
          </button>
        )}
      </div>
    </div>
  );
}

function Content({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-y-auto flex-1 px-4 py-6", className)}>
      {children}
    </div>
  );
}

export const LudoSlideOver = Object.assign(LudoSlideOverRoot, {
  Header,
  Content,
});
