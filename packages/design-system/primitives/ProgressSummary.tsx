import { Progress } from "@ludocode/external/ui/progress";
import { cn } from "../cn-utils";

export type ProgressSummaryProps = {
  current: number;
  total: number;
  detailed?: boolean;
  variant?: "row" | "col";
  name?: string;
};

export function ProgressSummary({
  current,
  total,
  detailed,
  variant = "row",
  name,
}: ProgressSummaryProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  const rounded = percent.toFixed(2);
  const alignment = variant == "col" ? "flex-col" : "flex-row items-center";

  return (
    <div className={cn("flex gap-1.5", alignment)}>
      {variant == "col" && detailed && (
        <div className="flex items-center justify-between">
          <span className="text-white/50 text-xs">
            {current}/{total} {name ?? ""}
          </span>
          <span className="text-ludo-accent text-xs font-bold">{rounded}%</span>
        </div>
      )}
      <Progress value={percent} className="w-full h-1.5 rounded-full" />
      {variant == "row" && detailed && (
        <span className="text-white/50 w-auto text-xs">
          {current}/{total} {name ?? ""}
        </span>
      )}
    </div>
  );
}
