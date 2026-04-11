import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

function formatDate(date: number[]) {
  const [, month, day] = date;
  return `${day}/${month}`;
}

export function MiniXpChart() {
  const { data: xpHistory = [] } = useSuspenseQuery(qo.xpHistory());

  const chartData = xpHistory.map((entry) => ({
    date: formatDate(entry.date),
    xp: entry.xp,
  }));

  if (chartData.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-ludo-surface)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "8px",
            color: "white",
            fontSize: "11px",
            padding: "4px 8px",
          }}
          labelStyle={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}
          formatter={(value) => [`${Number(value ?? 0)} XP`, ""]}
        />
        <Line
          type="monotone"
          dataKey="xp"
          stroke="var(--color-ludo-accent-muted)"
          strokeWidth={1.5}
          dot={{ r: 2, fill: "var(--color-ludo-accent-muted)", strokeWidth: 0 }}
          activeDot={{
            r: 3,
            fill: "var(--color-ludo-accent-muted)",
            strokeWidth: 1,
            stroke: "white",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
