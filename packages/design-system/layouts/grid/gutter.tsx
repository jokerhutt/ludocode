import { cn } from "@ludocode/design-system/cn-utils";

type GutterProps = {
  span?: 1 | 2 | 3;
  desktopOnly?: boolean;
  className?: string;
};

const SPAN = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
} as const;

export function Gutter({
  span = 1,
  desktopOnly = false,
  className,
}: GutterProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(SPAN[span], desktopOnly && "hidden lg:block", className)}
    />
  );
}
