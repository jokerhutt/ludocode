import { cn } from "@/components/cn-utils.ts";

type InnerRibbonProps = {
  className?: string;
};

export function InnerRibbon({ className }: InnerRibbonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -top-1.5 left-[-45px] w-30 h-3 bg-pythonYellow -rotate-45 rounded",
        className
      )}
    />
  );
}
