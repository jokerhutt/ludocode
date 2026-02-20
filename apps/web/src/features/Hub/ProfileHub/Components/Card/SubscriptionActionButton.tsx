import { ludoNavigation } from "@/constants/ludoNavigation";
import { useStripeManage } from "@/hooks/Queries/Mutations/useStripeManage";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import type { SubscriptionPlan } from "@ludocode/types";

type SubscriptionActionButtonProps = { plan: SubscriptionPlan };

export function SubscriptionActionButton({
  plan,
}: SubscriptionActionButtonProps) {
  const text = plan == "PATRON" ? "Manage plan" : "Upgrade plan";
  const { openManagePortal } = useStripeManage();

  const onClick = () => {
    if (plan == "PATRON") {
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
      className="w-1/3 md:w-full h-auto py-1"
      variant="alt"
    >
      {text}
    </LudoButton>
  );
}
