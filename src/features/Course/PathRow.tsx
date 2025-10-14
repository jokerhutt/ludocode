import type { ReactNode } from "react";

type PathRowProps = {
  children: ReactNode;
  index: number;
};

export function PathRow({ children, index }: PathRowProps) {

  const position = index % 2 == 0 ? "justify-end" : "justify-start"

  return (
    <div className={`w-full min-w-0 flex items-center ${position}`}>{children}</div>
  );
}
