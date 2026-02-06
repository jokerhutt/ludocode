import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type InputWrapperProps = {
  children: ReactNode;
  className?: string;
  error?: string;
};

export function InputWrapper({
  children,
  className,
  error,
}: InputWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col text-white w-full gap-2 items-start",
        className,
      )}
    >
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

type InputTitleProps = { children: ReactNode };

export function InputTitle({ children }: InputTitleProps) {
  return <h3>{children}</h3>;
}
