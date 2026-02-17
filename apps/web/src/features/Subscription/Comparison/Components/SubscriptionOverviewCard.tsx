import { cn } from "@ludocode/design-system/cn-utils";
import {
  subscriptionFeatures,
  type TierConfig,
} from "../content";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { FeatureRow } from "./FeatureRow";
import {
  LudoButton,
} from "@ludocode/design-system/primitives/ludo-button";

type SubscriptionOverviewCardProps = { plan: TierConfig };

export function SubscriptionOverviewCard({ plan }: SubscriptionOverviewCardProps) {
  return (
    <LudoCard
      key={plan.tier}
      shadow
      className={cn(
        "flex-1 flex flex-col gap-5 p-6 rounded-lg relative",
        plan.borderAccent,
        plan.glow,
      )}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-ludo-accent text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}

      <SubscriptionTierHeader config={plan} />

      <div className="h-px bg-ludo-border" />

      <div className="flex flex-col flex-1">
        {subscriptionFeatures.map((f) => (
          <FeatureRow
            key={f.label}
            included={f[plan.featureKey]}
            label={f.label}
          />
        ))}
      </div>

      <div className="h-px bg-ludo-border" />

      <SubscriptionLimitsOverview config={plan} />

      <SubscriptionOverviewButton config={plan} />
    </LudoCard>
  );
}

function SubscriptionTierHeader({ config }: { config: TierConfig }) {
  const { badge, badgeBg, badgeText, price, period, description } = config;

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

function SubscriptionLimitsOverview({ config }: { config: TierConfig }) {
  const { limits } = config;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-ludo-accent-muted">
        Limits
      </span>
      <div className="flex flex-col gap-1.5">
        {limits.map((limit) => (
          <div key={limit.label} className="flex items-center justify-between">
            <span className="text-xs text-ludo-text-dim">{limit.label}</span>
            <span className="text-xs font-medium text-ludoAltText">
              {limit.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionOverviewButton({ config }: { config: TierConfig }) {
  const { buttonLabel, buttonVariant, tier } = config;

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
      <span className="text-sm font-semibold">{buttonLabel}</span>
    </LudoButton>
  );
}
