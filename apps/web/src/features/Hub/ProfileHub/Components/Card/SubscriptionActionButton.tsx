import { ludoNavigation } from "@/constants/ludoNavigation";
import { useStripeManage } from "@/hooks/Queries/Mutations/useStripeManage";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { SubscriptionPlan } from "@ludocode/types";

type SubscriptionActionButtonProps = { plan: SubscriptionPlan };

export function SubscriptionActionButton({
  plan,
}: SubscriptionActionButtonProps) {
  const isDisabled = plan === "DEV";
  const text = isDisabled
    ? "Disabled"
    : plan === "FREE"
      ? "Upgrade"
      : "Manage plan";

  const { openManagePortal } = useStripeManage();

  const onClick = () => {
    if (isDisabled) return;
    if (plan == "SUPPORTER") {
      openManagePortal();
    } else {
      router.navigate(
        ludoNavigation.subscription.toSubscriptionComparisonPage(),
      );
    }
  };

  return (
    <LudoButton
      onClick={() => onClick()}
      disabled={isDisabled}
      className="w-full h-auto py-1"
      variant="alt"
    >
      {text}
    </LudoButton>
  );
}
