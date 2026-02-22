import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { SubscriptionActionButton } from "./SubscriptionActionButton";
import type { SubscriptionPlan } from "@ludocode/types";
import { parseToDigitDate } from "@ludocode/util/date/dateUtils";

type SubscriptionStatusCardProps = {
  planCode: SubscriptionPlan;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
};

export function SubscriptionStatusCard({
  planCode,
  currentPeriodEnd,
  cancelAtPeriodEnd,
}: SubscriptionStatusCardProps) {
  const isFree = planCode === "FREE";

  const statusColor = isFree
    ? "text-white/60"
    : cancelAtPeriodEnd
      ? "text-red-400"
      : "text-green-400";

  const renewalText = isFree
    ? "Subscribe to support"
    : cancelAtPeriodEnd
      ? `Ends ${parseToDigitDate(Number(currentPeriodEnd))}`
      : `Renews ${parseToDigitDate(Number(currentPeriodEnd))}`;

  return (
    <LudoCard shadow={false} className="p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide opacity-60">
            Current Plan
          </p>
          <p className="text-xl font-semibold">{planCode}</p>
        </div>

        <div className={`text-sm font-medium ${statusColor}`}>
          {isFree ? "Free" : cancelAtPeriodEnd ? "Cancelling" : "Active"}
        </div>
      </div>

      <div className="mt-auto w-full md:w-auto flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <p className="text-sm opacity-70">{renewalText}</p>

        <div className="w-full">
          <SubscriptionActionButton plan={planCode} />
        </div>
      </div>
    </LudoCard>
  );
}
