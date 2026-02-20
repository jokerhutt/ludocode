import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { SubscriptionActionButton } from "./SubscriptionActionButton";
import type { SubscriptionPlan } from "@ludocode/types";
import { parseToDigitDate } from "@ludocode/util/date/dateUtils";

type SubscriptionStatusCardProps = {
  planCode: SubscriptionPlan;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
};

export function SubscriptionStatusCard({
  planCode,
  currentPeriodEnd,
  cancelAtPeriodEnd,
}: SubscriptionStatusCardProps) {
  const isFree = planCode === "FREE";

  const statusLabel = isFree
    ? "Free Plan"
    : cancelAtPeriodEnd
      ? "Cancelling"
      : "Active";

  const renewalLabel = isFree
    ? "—"
    : cancelAtPeriodEnd
      ? `Ends on`
      : `Renews on`;

  const renewalValue = isFree
    ? "Upgrade to unlock more features"
    : parseToDigitDate(Number(currentPeriodEnd));

  return (
    <LudoCard
      shadow={false}
      className="grid h-auto p-4 text-sm lg:text-md grid-cols-[2fr_1fr] grid-rows-4"
    >
      <p className="text-left">Current plan:</p>
      <p className="text-right font-medium">{planCode}</p>

      <p className="text-left">Status:</p>
      <p
        className={`text-right font-medium ${
          cancelAtPeriodEnd ? "text-red-400" : "text-green-400"
        }`}
      >
        {statusLabel}
      </p>

      <p className="text-left">{renewalLabel}</p>
      <p className="text-right">{renewalValue}</p>

      <div className="col-span-2 flex justify-between items-center">
        <p className="text-left">
          {isFree ? "Upgrade plan" : "Manage billing"}
        </p>
        <SubscriptionActionButton plan={planCode} />
      </div>
    </LudoCard>
  );
}
