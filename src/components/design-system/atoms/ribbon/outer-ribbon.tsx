import { cn } from "@/components/cn-utils.ts";

type OuterRibbonProps = {
  className?: string;
};

export function OuterRibbon({ className }: OuterRibbonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -top-1.5 left-[-30px] w-30 h-3 bg-pythonBlue -rotate-45 rounded",
        className
      )}
    />
  );
}
