import { ludoNavigation } from "@/constants/ludoNavigation";
import { useStripeManage } from "@/hooks/Queries/Mutations/useStripeManage";
import { router } from "@/main";
import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import type { SubscriptionPlan } from "@ludocode/types";
import React from "react";
import { SubscriptionActionButton } from "./SubscriptionActionButton";

type AICreditBalanceCardProps = {
  remaining: number;
  allowance: number;
  renewalDate: string;
};

export function AICreditBalanceCard({
  remaining,
  allowance,
  renewalDate,
}: AICreditBalanceCardProps) {
  const fields: Array<{ label: string; value: React.ReactNode }> = [
    { label: "Credits remaining:", value: remaining },
    { label: "Monthly allowance:", value: allowance },
    { label: "Renews on:", value: renewalDate },
  ];

  return (
    <LudoCard
      shadow={false}
      className="grid h-auto p-4 text-sm lg:text-md grid-cols-[2fr_1fr] grid-rows-3"
    >
      {fields.map((f) => (
        <React.Fragment key={f.label}>
          <p className="text-left">{f.label}</p>
          <p className="text-right">{f.value}</p>
        </React.Fragment>
      ))}
    </LudoCard>
  );
}
