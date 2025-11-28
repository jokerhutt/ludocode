import { Input } from "@/components/ui/input";
import type { ReactNode } from "react";

type InputWrapperProps = { children: ReactNode };

export function InputWrapper({ children }: InputWrapperProps) {
  return (
    <div className="flex text-white w-full gap-4 items-center">{children}</div>
  );
}
