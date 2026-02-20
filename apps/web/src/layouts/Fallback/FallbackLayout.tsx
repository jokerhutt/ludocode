import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import type { ReactNode } from "react";

type FallbackLayoutProps = { children: ReactNode };

export function FallbackLayout({ children }: FallbackLayoutProps) {
  return (
    <div className="h-dvh w-dvw bg-ludo-background fixed">
      {children}
    </div>
  );
}
