import type { ReactNode } from "react";

type MainContentWrapperProps = {
  children: ReactNode;
};

export function MainContentWrapper({ children }: MainContentWrapperProps) {
  return <main className="min-h-0 overflow-auto">{children}</main>;
}
