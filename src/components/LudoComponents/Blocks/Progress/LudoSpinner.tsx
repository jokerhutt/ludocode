import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/components/utils";
import type { ReactNode } from "react";

type LudoSpinnerProps = {
  wide?: boolean;
  children?: ReactNode;
  className?: string;
  spinnerClassName?: string;
};

export function LudoSpinner({
  wide = false,
  className,
  children,
  spinnerClassName,
}: LudoSpinnerProps) {
  const wideStyle = wide ? "w-full h-full" : "";

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center",
        wideStyle,
        className
      )}
    >
      <Spinner className={spinnerClassName} />
      {children && children}
    </div>
  );
}
