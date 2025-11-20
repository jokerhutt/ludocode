type ProgressCellProps = {
  index: number;
  safeCompleted: number;
  safeTotal: number;
};

export function ProgressCell({
  index,
  safeCompleted,
  safeTotal,
}: ProgressCellProps) {
  const done = index < safeCompleted;
  const isFirst = index === 0;
  const isLast = index === safeTotal - 1;

  const rounding = isFirst ? "rounded-l-full" : isLast ? "rounded-r-full" : "";
  const color = done ? "bg-ludoLightPurple" : "bg-ludoGrayDark";

  return <div key={index} className={["h-3", color, rounding].join(" ")} />;
}
