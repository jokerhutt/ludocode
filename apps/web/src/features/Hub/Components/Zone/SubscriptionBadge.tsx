import { cn } from "@ludocode/design-system/cn-utils";
import type { SubscriptionPlan } from "@ludocode/types";

const tierStyles: Record<
  SubscriptionPlan,
  { bg: string; text: string; glow: string; label: string }
> = {
  FREE: {
    bg: "bg-ludo-surface",
    text: "text-ludo-accent-muted",
    glow: "",
    label: "FREE",
  },
  SUPPORTER: {
    bg: "bg-gradient-to-r from-ludo-accent to-ludo-progress",
    text: "text-white",
    glow: "shadow-[0_0_8px_rgba(106,124,255,0.4)]",
    label: "SUPPORTER",
  },
};

type SubscriptionBadgeProps = {
  tier: SubscriptionPlan;
  className?: string;
};

export function SubscriptionBadge({ tier, className }: SubscriptionBadgeProps) {
  const style = tierStyles[tier];

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-md px-2.5 py-1",
        "text-xs font-bold tracking-wider select-none",
        style.bg,
        style.text,
        style.glow,
        className,
      )}
    >
      {style.label}
    </div>
  );
}
