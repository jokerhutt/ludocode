import type { ReactNode } from "react";

type InputTitleProps = { children: ReactNode };

export function InputTitle({ children }: InputTitleProps) {
  return <h3>{children}</h3>;
}
