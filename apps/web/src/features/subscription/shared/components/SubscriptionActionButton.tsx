import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useStripeManage } from "@/queries/mutations/useStripeManage.tsx";
import { router } from "@/main.tsx";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button.tsx";
import type { SubscriptionPlan } from "@ludocode/types";

type SubscriptionActionButtonProps = {
  plan: SubscriptionPlan;
  isDisabled: boolean;
};

export function SubscriptionActionButton({
  plan,
  isDisabled,
}: SubscriptionActionButtonProps) {
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
