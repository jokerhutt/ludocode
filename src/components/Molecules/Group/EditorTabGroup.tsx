import type { ReactNode } from "react";

type EditorTabGroupProps = { children: ReactNode };

export function EditorTabGroup({ children }: EditorTabGroupProps) {
  return <div className="flex h-full pt-2 px-6 items-center">{children}</div>;
}
