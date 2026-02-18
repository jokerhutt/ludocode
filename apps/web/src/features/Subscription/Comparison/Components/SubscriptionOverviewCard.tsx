import { cn } from "@ludocode/design-system/cn-utils";
import { planStyles, type PlanStyleConfig } from "../content";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { FeatureRow } from "./FeatureRow";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { Feature, PlanOverview, SubscriptionPlan } from "@ludocode/types";
import { useStripeCheckout } from "@/hooks/Queries/Mutations/useStripeCheckout";

type SubscriptionOverviewCardProps = {
  plan: PlanOverview;
  current: SubscriptionPlan;
  navToCurrent: () => void;
};

export function SubscriptionOverviewCard({
  plan,
  current,
  navToCurrent,
}: SubscriptionOverviewCardProps) {
  const styles = planStyles[plan.tier];

  const ALL_FEATURES: { code: Feature; title: string }[] = [
    { code: "CORE_COURSES", title: "Core Courses" },
    { code: "CODE_EDITOR", title: "Built-in Code Editor" },
    { code: "PUBLISH_PROJECTS", title: "Publish Projects" },
    { code: "SKILL_PATHS", title: "Skill Paths" },
    { code: "AI_ASSISTANT", title: "AI Assistant" },
    { code: "PRIORITY_SUPPORT", title: "Priority Support" },
  ];

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
        {ALL_FEATURES.map((feature) => {
          const included = plan.features.includes(feature.code);

          return (
            <FeatureRow
              key={feature.code}
              included={included}
              label={feature.title}
            />
          );
        })}
      </div>

      <div className="h-px bg-ludo-border" />

      <SubscriptionLimitsOverview plan={plan} style={styles} />

      <SubscriptionOverviewButton
        navToCurrent={navToCurrent}
        current={current}
        plan={plan}
        style={styles}
      />
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
        <div className="flex items-center justify-between">
          <span className="text-xs text-ludo-text-dim">Max Projects</span>
          <span className="text-xs font-medium text-ludoAltText">
            {limits.maxProjects}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-ludo-text-dim">Monthly AI credits</span>
          <span className="text-xs font-medium text-ludoAltText">
            {limits.monthlyAiCredits}
          </span>
        </div>
      </div>
    </div>
  );
}

function SubscriptionOverviewButton({
  plan,
  style,
  current,
  navToCurrent,
}: {
  plan: PlanOverview;
  style: PlanStyleConfig;
  current: SubscriptionPlan;
  navToCurrent: () => void;
}) {
  const { tier } = plan;
  const { buttonVariant } = style;

  const { startCheckout } = useStripeCheckout();

  if (tier === "FREE" && current !== "FREE") {
    return null;
  }

  let text: string;
  let disabled = false;

  if (tier === current) {
    text = "Current";
    disabled = true;
  } else if (current === "FREE") {
    text = `Upgrade to ${tier}`;
  } else if (current === "CORE" && tier === "PRO") {
    text = "Upgrade to PRO";
  } else if (current === "PRO" && tier === "CORE") {
    text = "Downgrade to CORE";
  } else {
    text = `Switch to ${tier}`;
  }

  const handleClick = () => {
    if (tier === "FREE" || tier === current) {
      navToCurrent()
    } else {
      startCheckout(tier)
    }
  };

  return (
    <LudoButton
      shadow
      disabled={disabled}
      variant={buttonVariant}
      className={cn(
        "mt-auto",
        tier === "PRO" &&
          "bg-linear-to-r! from-purple-500! to-fuchsia-400! text-white! shadow-[0_7px_0_#6b21a8]!",
      )}
      onClick={() => handleClick()}
    >
      <span className="text-sm font-semibold">{text}</span>
    </LudoButton>
  );
}
