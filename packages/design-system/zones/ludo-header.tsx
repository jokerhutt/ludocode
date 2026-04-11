import { cn } from "@ludocode/design-system/cn-utils";
import { RouterBar } from "@ludocode/design-system/primitives/router-bar";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { X } from "lucide-react";
import type { BannerType } from "@ludocode/types";

export type DeviceType = "Mobile" | "Desktop" | "Both";

export type BarState = "idle" | "loading" | "loadingDone";

const BANNER_DISMISS_TTL_MS = 2 * 24 * 60 * 60 * 1000;

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

type BannerEntry = {
  text: string;
  id?: string | number;
  type?: BannerType;
};

type BannerProps =
  | {
      text: string;
      id?: string | number;
      banners?: BannerEntry[];
    }
  | {
      text?: string;
      id?: string | number;
      banners: BannerEntry[];
    };

function DismissibleBanner({ text, id, type = "INCIDENT" }: BannerEntry) {
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [dismissedFromStorage, setDismissedFromStorage] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !id) {
      setHydrated(true);
      return;
    }

    const storageKey = `banner:${String(id)}`;
    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      setHydrated(true);
      return;
    }

    const expiresAt = Number(raw);
    if (!Number.isFinite(expiresAt)) {
      window.localStorage.removeItem(storageKey);
      setHydrated(true);
      return;
    }

    if (Date.now() < expiresAt) {
      setVisible(false);
      setDismissedFromStorage(true);
    } else {
      window.localStorage.removeItem(storageKey);
    }

    setHydrated(true);
  }, [id]);

  useEffect(() => {
    if (innerRef.current) {
      setHeight(innerRef.current.scrollHeight);
    }
  }, [text]);

  const dismissBanner = () => {
    if (typeof window !== "undefined" && id) {
      const storageKey = `banner:${String(id)}`;
      const expiresAt = Date.now() + BANNER_DISMISS_TTL_MS;
      window.localStorage.setItem(storageKey, expiresAt.toString());
    }
    setVisible(false);
  };

  if (!hydrated) return null;
  if (!visible && (dismissedFromStorage || height !== undefined)) return null;

  const variantBackgroundClass =
    type === "FEATURE"
      ? "bg-ludo-correct"
      : type === "MAINTENANCE"
        ? "bg-ludo-accent"
        : "bg-ludo-incorrect";

  return (
    <div
      className="col-span-full overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: visible ? (height ?? "auto") : 0 }}
    >
      <div
        ref={innerRef}
        className={cn(
          "flex w-full items-center justify-center gap-3 px-4 py-1.5",
          variantBackgroundClass,
        )}
      >
        <p className="text-xs font-medium text-ludo-white-bright text-center flex-1">
          {text}
        </p>
        <button
          onClick={dismissBanner}
          className="shrink-0 rounded-full p-0.5 text-xs lg:text-sm text-ludo-white-bright/70 hover:text-ludo-white-bright hover:bg-white/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function Banner({ text, id, banners }: BannerProps) {
  if (Array.isArray(banners)) {
    if (banners.length === 0) return null;

    return (
      <>
        {banners.map((banner) => (
          <DismissibleBanner
            key={String(banner.id ?? banner.text)}
            id={banner.id}
            text={banner.text}
            type={banner.type}
          />
        ))}
      </>
    );
  }

  if (!text) return null;
  return <DismissibleBanner text={text} id={id} type="INCIDENT" />;
}

function Badge({
  label,
  style,
}: {
  label: string;
  style: "disabled" | "enabled";
}) {
  const theme =
    style == "disabled"
      ? "bg-ludo-surface text-ludo-accent-muted"
      : "bg-gradient-to-r from-ludo-accent to-ludo-progress text-ludo-white-bright shadow-[0_0_8px_rgba(106,124,255,0.4)]";

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md px-2.5 py-1",
        "text-xs font-bold tracking-wider select-none",
        theme
      )}
    >
      {label}
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
  Badge
});
