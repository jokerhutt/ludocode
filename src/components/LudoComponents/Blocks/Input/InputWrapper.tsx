import { cn } from "@/components/utils";
import type { ReactNode } from "react";

type InputWrapperProps = { children: ReactNode; className?: string };

export function InputWrapper({ children, className }: InputWrapperProps) {
  return (
    <div
      className={cn(
        "flex flex-col text-white w-full gap-2 items-start",
        className
      )}
    >
      {children}
    </div>
  );
}
