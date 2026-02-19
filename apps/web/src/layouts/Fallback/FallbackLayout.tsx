import { MainGridWrapper } from "@ludocode/design-system/layouts/grid/main-grid-wrapper";
import type { ReactNode } from "react";

type FallbackLayoutProps = { children: ReactNode };

export function FallbackLayout({ children }: FallbackLayoutProps) {
  return (
    <MainGridWrapper gridRows={"ONE"}>
      {children}
    </MainGridWrapper>
  );
}
