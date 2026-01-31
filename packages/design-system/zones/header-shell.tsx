import { cn } from "@ludocode/design-system/cn-utils";
import { RouterBar } from "@ludocode/design-system/primitives/router-bar";
import { useEffect, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";

export type DeviceType = "Mobile" | "Desktop" | "Both";

export type HeaderShellProps = {
  children: ReactNode;
  className?: string;
  device?: DeviceType;
};

export function HeaderShell({
  children,
  className,
  device = "Both",
}: HeaderShellProps) {
  const visibility =
    device == "Both"
      ? "grid"
      : device == "Desktop"
        ? "hidden lg:grid"
        : "lg:hidden";

  return (
    <nav
      className={cn(
        `relative col-span-full grid  ${visibility} border-b border-b-ludo-background lg:border-b-2 lg:border-b-ludo-background grid-cols-12 min-h-14 bg-ludo-surface`,
        className
      )}
    >
      {children}
    </nav>
  );
}

export type BarState = "idle" | "loading" | "loadingDone";

export function HeaderWithBar({
  children,
  className,
  device = "Both",
}: HeaderShellProps) {
  const { barState } = useRouterBar();

  return (
    <HeaderShell className={className} device={device}>
      {children}
      <RouterBar barState={barState} />
    </HeaderShell>
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
