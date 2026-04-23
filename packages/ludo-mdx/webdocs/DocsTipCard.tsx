import type { ReactNode } from "react";

type TipVariant = "tip" | "warning" | "info" | "note";

type DocsTipCardProps = {
  variant?: TipVariant;
  title?: string;
  children: ReactNode;
};

const variantConfig: Record<
  TipVariant,
  { icon: string; borderColor: string; bgColor: string; titleColor: string }
> = {
  tip: {
    icon: "💡",
    borderColor: "border-l-ludo-accent",
    bgColor: "bg-ludo-accent/5",
    titleColor: "text-ludo-accent-muted",
  },
  warning: {
    icon: "⚠️",
    borderColor: "border-l-ludo-amber",
    bgColor: "bg-ludo-amber/5",
    titleColor: "text-ludo-amber-alt",
  },
  info: {
    icon: "ℹ️",
    borderColor: "border-l-sky-500",
    bgColor: "bg-sky-500/5",
    titleColor: "text-sky-400",
  },
  note: {
    icon: "📝",
    borderColor: "border-l-ludo-accent-muted",
    bgColor: "bg-ludo-accent-muted/5",
    titleColor: "text-ludo-accent-muted",
  },
};

export function DocsTipCard({
  variant = "tip",
  title,
  children,
}: DocsTipCardProps) {
  const config = variantConfig[variant];

  const displayTitle =
    title ?? variant.charAt(0).toUpperCase() + variant.slice(1);

  return (
    <div
      className={`
        my-5 rounded-r-lg border-l-4 ${config.borderColor} ${config.bgColor}
        px-4 py-3 sm:px-5 sm:py-4
      `}
    >
      <div
        className={`flex items-center gap-2 mb-2 text-sm font-semibold ${config.titleColor}`}
      >
        <span>{config.icon}</span>
        <span>{displayTitle}</span>
      </div>
      <div className="text-sm text-ludo-white leading-relaxed">{children}</div>
    </div>
  );
}
