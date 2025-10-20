import type { ReactNode } from "react";

type MainContentWrapperProps = {
  children: ReactNode;
};

export function MainContentWrapper({ children }: MainContentWrapperProps) {
  return <main className="min-h-0 [scrollbar-gutter:stable_right] overflow-auto">{children}</main>;
}
