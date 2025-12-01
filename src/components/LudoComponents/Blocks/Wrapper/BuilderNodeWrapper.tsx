import type { ReactNode } from "react";

type BuilderNodeWrapperProps = { children: ReactNode };

export function BuilderNodeWrapper({
  children,
}: BuilderNodeWrapperProps) {
  return <div className="flex items-center gap-4 pr-4">{children}</div>;
}
