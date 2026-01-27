import { cn } from "@ludocode/design-system/cn-utils";
import { Progress } from "@ludocode/external/ui/progress";

type CourseProgressBarProps = { className?: string; value: number };

export function CourseProgressBar({
  className,
  value,
}: CourseProgressBarProps) {
  return (
    <div className={cn("w-full gap-4 flex items-center", className)}>
      <Progress value={value} />
      <p>{value}%</p>
    </div>
  );
}
