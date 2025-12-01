import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MainGridWrapperProps = {
  children: ReactNode;
  gridRows: "FULL" | "SITE" | "ONE" | "SITE_INVERSE";
  className?: string;
};

export function MainGridWrapper({ children, gridRows, className }: MainGridWrapperProps) {
  const rows = {
    FULL: "grid-rows-[auto_1fr_auto]",
    SITE: "grid-rows-[auto_1fr_auto] lg:grid-rows-[auto_1fr]",
    SITE_INVERSE: "grid-rows-[1fr_auto]",
    ONE: "grid-rows-[1fr]"
  };

  return (
    <div className={cn(`grid bg-ludoGrayDark ${rows[gridRows]} min-h-0 h-dvh`, className)}>{children}</div>
  );
}
