import type { ReactNode } from "react";
import { cn } from "@/components/cn-utils.ts";

type AppFooterProps = {
  children: ReactNode;
  className?: string;
};

export function AppFooter({ children, className }: AppFooterProps) {
  return (
    <footer
      className={cn(
        `col-span-full min-h-20 grid grid-cols-12 bg-ludoGrayLight`,
        className
      )}
    >
      {children}
    </footer>
  );
}
