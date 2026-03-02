import { cn } from "@ludocode/design-system/cn-utils";
import { RouterBar } from "@ludocode/design-system/primitives/router-bar";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";

export type DeviceType = "Mobile" | "Desktop" | "Both";

export type BarState = "idle" | "loading" | "loadingDone";


function LudoHeaderRoot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("col-span-full flex flex-col", className)}>
      {children}
    </div>
  );
}

function Shell({
  children,
  className,
  device = "Both",
}: {
  children: ReactNode;
  className?: string;
  device?: DeviceType;
}) {
  const visibility =
    device === "Both"
      ? "grid"
      : device === "Desktop"
        ? "hidden lg:grid"
        : "lg:hidden";

  return (
    <nav
      className={cn(
        `relative col-span-full grid ${visibility} border-b border-b-ludo-background lg:border-b-2 lg:border-b-ludo-background grid-cols-12 min-h-14 bg-ludo-surface`,
        className,
      )}
    >
      {children}
    </nav>
  );
}

function Bar() {
  const { barState } = useRouterBar();
  return <RouterBar barState={barState} />;
}

function Banner({ text }: { text: string }) {
  const [visible, setVisible] = useState(true);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, [text]);

  if (!visible && height !== undefined) return null;

  return (
    <div
      className="col-span-full overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: visible ? (height ?? "auto") : 0 }}
    >
      <div
        ref={innerRef}
        className="flex w-full items-center justify-center gap-3 bg-ludo-incorrect px-4 py-1.5"
      >
        <p className="text-xs font-medium text-white text-center flex-1">
          {text}
        </p>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-full p-0.5 text-xs lg:text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function useRouterBar() {
  const { status } = useRouterState();
  const [barState, setBarState] = useState<BarState>("idle");

  useEffect(() => {
    if (status === "pending") {
      setBarState("loading");
    } else if (status === "idle") {
      setBarState("loadingDone");
      setTimeout(() => setBarState("idle"), 200);
    }
  }, [status]);

  return { barState };
}

export const LudoHeader = Object.assign(LudoHeaderRoot, {
  Shell,
  Bar,
  Banner,
});
