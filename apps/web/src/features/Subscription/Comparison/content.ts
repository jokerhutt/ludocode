import type { LudoButtonVariant } from "@ludocode/design-system/primitives/ludo-button";
import type { SubscriptionPlan } from "@ludocode/types";

export type PlanStyleConfig = {
  featureKey: "free" | "supporter" | "patron";
  badge: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
  buttonVariant: LudoButtonVariant;
  glow: string;
  recommended?: boolean;
  title: string;
};

export const planStyles: Record<SubscriptionPlan, PlanStyleConfig> = {
  FREE: {
    title: "Access to core features",
    featureKey: "free",
    badge: "FREE",
    badgeBg: "bg-ludo-surface",
    badgeText: "text-ludo-accent-muted",
    borderAccent: "",
    buttonVariant: "white",
    glow: "",
  },

  SUPPORTER: {
    title: "Unlock the full learning experience",
    featureKey: "supporter",
    badge: "SUPPORTER",
    badgeBg: "bg-gradient-to-r from-ludo-accent to-ludo-progress",
    badgeText: "text-ludo-white-bright",
    borderAccent: "border border-ludo-accent-dim",
    buttonVariant: "alt",
    glow: "shadow-[0_0_20px_rgba(106,124,255,0.15)]",
    recommended: true,
  },

  DEV: {
    title: "Have fun!",
    featureKey: "supporter",
    badge: "DEV",
    badgeBg: "bg-gradient-to-r from-ludo-accent to-ludo-progress",
    badgeText: "text-ludo-white-bright",
    borderAccent: "border border-ludo-accent-dim",
    buttonVariant: "alt",
    glow: "shadow-[0_0_20px_rgba(106,124,255,0.15)]",
  },
};
