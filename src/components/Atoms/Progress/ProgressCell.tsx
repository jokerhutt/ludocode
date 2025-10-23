type ProgressCellProps = {
  index: number;
  safeCompleted: number;
  safeTotal: number;
};

export function ProgressCell({index, safeCompleted, safeTotal}: ProgressCellProps) {
  const done = index < safeCompleted;
  const isFirst = index === 0;
  const isLast = index === safeTotal - 1;

  return (
    <div
      key={index}
      className={[
        "h-3",
        done ? "bg-pythonYellow" : "bg-ludoGrayDark",
        isFirst ? "rounded-l-full" : "",
        isLast ? "rounded-r-full" : "",
      ].join(" ")}
    />
  );
}
