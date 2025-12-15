import { cn } from "@/components/cn-utils.ts";

type InnerRibbonProps = {
  className?: string;
};

export function InnerRibbon({ className }: InnerRibbonProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute -top-1.5 -right-12 w-30 h-3 bg-ludoLightPurple -rotate-135 rounded",
        className
      )}
    />
  );
}
