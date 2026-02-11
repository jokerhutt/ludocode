import type { ExerciseType } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils";

const config: Record<ExerciseType, { label: string; className: string }> = {
  INFO: {
    label: "Info",
    className: "bg-blue-500/20 text-blue-400",
  },
  CLOZE: {
    label: "Cloze",
    className: "bg-emerald-500/20 text-emerald-400",
  },
  TRIVIA: {
    label: "Trivia",
    className: "bg-amber-500/20 text-amber-400",
  },
  ANALYZE: {
    label: "Analyze",
    className: "bg-purple-500/20 text-purple-400",
  },
};

type ExerciseTypePillProps = {
  type: ExerciseType;
};

export function ExerciseTypePill({ type }: ExerciseTypePillProps) {
  const { label, className } = config[type] ?? {
    label: type,
    className: "bg-gray-500/20 text-gray-400",
  };

  return (
    <span
      className={cn(
        "shrink-0 w-16 text-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {label}
    </span>
  );
}
