import { LudoCard } from "@ludocode/design-system/primitives/ludo-card";
import { parseToDigitDate } from "@ludocode/util/date/dateUtils";

type AICreditBalanceCardProps = {
  remaining: number;
  allowance: number;
  currentPeriodEnd: number;
};

export function AICreditBalanceCard({
  remaining,
  allowance,
  currentPeriodEnd,
}: AICreditBalanceCardProps) {
  const percent = Math.round((remaining / allowance) * 100);

  return (
    <LudoCard shadow={false} className="p-5 flex flex-col gap-4 h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs uppercase tracking-wide opacity-60">
            AI Credits
          </p>
          <p className="text-2xl font-semibold">
            {remaining}
            <span className="text-sm opacity-60"> / {allowance}</span>
          </p>
        </div>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-ludo-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-auto w-full md:w-auto flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <p className="text-sm opacity-70">Renews {parseToDigitDate(Number(currentPeriodEnd))}</p>
        <div className="w-full md:w-auto" />
      </div>
    </LudoCard>
  );
}
