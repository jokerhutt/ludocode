import {
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog.tsx";
import { DialogWrapper } from "@ludocode/design-system/widgets/ludo-dialog.tsx";
import { ZapIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import type { ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type XpDialogProps = {
  children: ReactNode;
  asChild?: boolean;
};

function formatDate(date: number[]) {
  const [, month, day] = date;
  return `${day}/${month}`;
}

export function XpDialog({ children, asChild = true }: XpDialogProps) {
  const { data: xpHistory = [] } = useQuery(qo.xpHistory());

  const chartData = xpHistory.map((entry) => ({
    date: formatDate(entry.date),
    xp: entry.xp,
  }));

  const totalXp = xpHistory.reduce((sum, entry) => sum + entry.xp, 0);

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogWrapper>
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-14 h-14 rounded-full bg-ludo-accent-muted/15 flex items-center justify-center">
            <ZapIcon className="h-7 w-7 fill-ludo-accent-muted text-ludo-accent-muted" />
          </div>
          <DialogTitle className="text-ludo-white-bright font-bold text-xl">
            Your XP
          </DialogTitle>
        </div>

        <div className="bg-ludo-background rounded-xl p-4 flex items-center justify-between">
          <span className="text-ludo-white-dim text-sm">Past 7 days</span>
          <span className="text-ludo-white-bright text-2xl font-bold tabular-nums">
            {totalXp} XP
          </span>
        </div>

        {chartData.length > 0 && (
          <div className="bg-ludo-background rounded-xl p-4">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={30}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-ludo-surface)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "13px",
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  formatter={(value) => [`${Number(value ?? 0)} XP`, "XP"]}
                />
                <Line
                  type="monotone"
                  dataKey="xp"
                  stroke="var(--color-ludo-accent-muted)"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "var(--color-ludo-accent-muted)",
                    strokeWidth: 0,
                  }}
                  activeDot={{
                    r: 6,
                    fill: "var(--color-ludo-accent-muted)",
                    strokeWidth: 2,
                    stroke: "white",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <p className="text-ludo-white-bright/30 text-xs text-center">
          Earn XP by completing lessons and exercises.
        </p>
      </DialogWrapper>
    </Dialog>
  );
}
