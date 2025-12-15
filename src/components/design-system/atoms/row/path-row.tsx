import type { ReactNode } from "react";

type PathRowProps = {
  children: ReactNode;
  index: number;
};

export function PathRow({ children, index }: PathRowProps) {

  const position = index % 2 == 0 ? "flex-row-reverse" : "flex-row"

  return (
    <div className={`w-full min-w-0 relative flex items-center ${position}`}>{children}</div>
  );
}
