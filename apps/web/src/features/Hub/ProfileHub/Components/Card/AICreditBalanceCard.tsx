import { LudoButton } from "@ludocode/design-system/primitives/ludo-button";
import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import React from "react";

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
    <LudoCard shadow={false} className="grid h-auto p-4 grid-cols-[2fr_1fr] grid-rows-4">
      {fields.map((f) => (
        <React.Fragment key={f.label}>
          <p className="text-left">{f.label}</p>
          <p className="text-right">{f.value}</p>
        </React.Fragment>
      ))}

      <div className="col-span-2 flex justify-between items-center">
        <p className="text-left">Need more?</p>
        <LudoButton className="w-1/2 h-auto py-1" variant="alt">
          Get Ludo Pro
        </LudoButton>
      </div>
    </LudoCard>
  );
}
