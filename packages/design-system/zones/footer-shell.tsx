import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type FooterShellProps = {
  children: ReactNode;
  className?: string;
};

export function FooterShell({ children, className }: FooterShellProps) {
  return (
    <footer
      className={cn(
        `col-span-full min-h-20 lg:min-h-26 grid grid-cols-12 bg-ludoGrayLight`,
        className
      )}
    >
      {children}
    </footer>
  );
}
