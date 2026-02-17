import type { SubscriptionPlan } from "@ludocode/types";

export type PlanStyleConfig = {
  featureKey: "free" | "core" | "pro";
  badge: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
  buttonVariant: "default" | "alt";
  glow: string;
  recommended?: boolean;
};

export const planStyles: Record<SubscriptionPlan, PlanStyleConfig> = {
  FREE: {
    featureKey: "free",
    badge: "FREE",
    badgeBg: "bg-ludo-surface",
    badgeText: "text-ludo-accent-muted",
    borderAccent: "",
    buttonVariant: "default",
    glow: "",
  },

  CORE: {
    featureKey: "core",
    badge: "CORE",
    badgeBg: "bg-gradient-to-r from-ludo-accent to-ludo-progress",
    badgeText: "text-white",
    borderAccent: "border border-ludo-accent/60",
    buttonVariant: "alt",
    glow: "shadow-[0_0_20px_rgba(106,124,255,0.15)]",
    recommended: true,
  },

  PRO: {
    featureKey: "pro",
    badge: "PRO",
    badgeBg: "bg-gradient-to-r from-purple-500 to-fuchsia-400",
    badgeText: "text-white",
    borderAccent: "border border-purple-500/40",
    buttonVariant: "default",
    glow: "shadow-[0_0_20px_rgba(131,105,214,0.2)]",
  },
};