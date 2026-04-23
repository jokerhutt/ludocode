import type { ExerciseType } from "@ludocode/types";
import { cn } from "@ludocode/design-system/cn-utils.ts";

const config: Record<ExerciseType, { label: string; className: string }> = {
  INFO: {
    label: "Info",
    className: "bg-blue-500/20 text-blue-400",
  },
  CLOZE: {
    label: "Cloze",
    className: "bg-ludo-success-alt/20 text-ludo-success",
  },
  SELECT: {
    label: "Select",
    className: "bg-ludo-amber/20 text-ludo-amber-alt",
  },
  EXECUTABLE: {
    label: "Exec",
    className: "bg-orange-500/20 text-orange-400",
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
