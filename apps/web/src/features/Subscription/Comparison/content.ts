import type { SubscriptionPlan } from "@ludocode/types";

export type TierConfig = {
  tier: SubscriptionPlan;
  price: string;
  period: string;
  description: string;
  featureKey: "free" | "core" | "pro";
  badge: string;
  badgeBg: string;
  badgeText: string;
  borderAccent: string;
  buttonVariant: "default" | "alt";
  buttonLabel: string;
  glow: string;
  recommended?: boolean;
  limits: { label: string; value: string }[];
};

export const subscriptionTiers: TierConfig[] = [
  {
    tier: "FREE",
    price: "$0",
    period: "",
    description: "Get started with the basics",
    featureKey: "free",
    badge: "FREE",
    badgeBg: "bg-ludo-surface",
    badgeText: "text-ludo-accent-muted",
    borderAccent: "",
    buttonVariant: "default",
    buttonLabel: "Current Plan",
    glow: "",
    limits: [
      { label: "Projects", value: "3" },
      { label: "AI credits", value: "10" },
    ],
  },
  {
    tier: "CORE",
    price: "$9",
    period: "/month",
    description: "Unlock the full learning experience",
    featureKey: "core",
    badge: "CORE",
    badgeBg: "bg-gradient-to-r from-ludo-accent to-ludo-progress",
    badgeText: "text-white",
    borderAccent: "border border-ludo-accent/60",
    buttonVariant: "alt",
    buttonLabel: "Upgrade to Core",
    glow: "shadow-[0_0_20px_rgba(106,124,255,0.15)]",
    recommended: true,
    limits: [
      { label: "Projects", value: "10" },
      { label: "AI credits", value: "50" },
    ],
  },
  {
    tier: "PRO",
    price: "$19",
    period: "/month",
    description: "Everything, plus AI and priority perks",
    featureKey: "pro",
    badge: "PRO",
    badgeBg: "bg-gradient-to-r from-purple-500 to-fuchsia-400",
    badgeText: "text-white",
    borderAccent: "border border-purple-500/40",
    buttonVariant: "default",
    buttonLabel: "Go Pro",
    glow: "shadow-[0_0_20px_rgba(131,105,214,0.2)]",
    limits: [
      { label: "Projects", value: "50" },
      { label: "AI credits", value: "200" },
    ],
  },
];

export type Feature = {
  label: string;
  free: boolean;
  core: boolean;
  pro: boolean;
};

export const subscriptionFeatures: Feature[] = [
  { label: "Access to core courses", free: true, core: true, pro: true },
  { label: "Access to code editor", free: true, core: true, pro: true },
  { label: "Ability to publish projects", free: true, core: true, pro: true },
  { label: "Access to skill paths", free: false, core: true, pro: true },
  { label: "Project-based learning", free: false, core: true, pro: true },
  { label: "AI code assistant", free: false, core: false, pro: true },
  { label: "Priority support", free: false, core: false, pro: true },
];
