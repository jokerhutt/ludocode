import { cn } from "@ludocode/design-system/cn-utils";
import { planStyles, type PlanStyleConfig } from "../content";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { FeatureRow } from "./FeatureRow";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { PlanOverview } from "@ludocode/types";

type SubscriptionOverviewCardProps = { plan: PlanOverview };

export function SubscriptionOverviewCard({
  plan,
}: SubscriptionOverviewCardProps) {
  const styles = planStyles[plan.tier];

  return (
    <LudoCard
      key={plan.tier}
      shadow
      className={cn(
        "flex-1 flex flex-col gap-5 p-6 rounded-lg relative",
        styles.borderAccent,
        styles.glow,
      )}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-ludo-accent text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <SubscriptionTierHeader plan={plan} style={styles} />

      <div className="h-px bg-ludo-border" />

      <div className="flex flex-col flex-1">
        {plan.features.map((f) => (
          <FeatureRow key={f.title} included={f.enabled} label={f.title} />
        ))}
      </div>

      <div className="h-px bg-ludo-border" />

      <SubscriptionLimitsOverview plan={plan} style={styles} />

      <SubscriptionOverviewButton plan={plan} style={styles} />
    </LudoCard>
  );
}

function SubscriptionTierHeader({
  plan,
  style,
}: {
  plan: PlanOverview;
  style: PlanStyleConfig;
}) {
  const { badge, badgeBg, badgeText } = style;
  const { price, period, description } = plan;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wider",
            badgeBg,
            badgeText,
          )}
        >
          {badge}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-white">{price}</span>
        <span className="text-sm text-ludo-accent-muted">{period}</span>
      </div>
      <p className="text-sm text-ludoAltText min-h-10">{description}</p>
    </div>
  );
}

function SubscriptionLimitsOverview({
  plan,
}: {
  plan: PlanOverview;
  style: PlanStyleConfig;
}) {
  const { limits } = plan;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-ludo-accent-muted">
        Limits
      </span>
      <div className="flex flex-col gap-1.5">
        {limits.map((limit) => (
          <div key={limit.title} className="flex items-center justify-between">
            <span className="text-xs text-ludo-text-dim">{limit.title}</span>
            <span className="text-xs font-medium text-ludoAltText">
              {limit.limit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionOverviewButton({
  plan,
  style,
}: {
  plan: PlanOverview;
  style: PlanStyleConfig;
}) {
  const { tier } = plan;
  const { buttonVariant } = style;

  return (
    <LudoButton
      shadow
      variant={buttonVariant}
      className={cn(
        "mt-auto",
        tier === "PRO" &&
          "bg-linear-to-r! from-purple-500! to-fuchsia-400! text-white! shadow-[0_7px_0_#6b21a8]!",
      )}
    >
      <span className="text-sm font-semibold">{tier}</span>
    </LudoButton>
  );
}
