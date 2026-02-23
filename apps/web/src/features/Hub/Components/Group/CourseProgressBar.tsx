import { cn } from "@ludocode/design-system/cn-utils";
import { Progress } from "@ludocode/external/ui/progress";

type CourseProgressBarProps = { className?: string; value: number };

export function CourseProgressBar({
  className,
  value,
}: CourseProgressBarProps) {

  const rounded = Number(value.toFixed(2))

  return (
    <div className={cn("w-full gap-4 flex items-center", className)}>
      <Progress value={value} />
      <p>{rounded}%</p>
    </div>
  );
}
