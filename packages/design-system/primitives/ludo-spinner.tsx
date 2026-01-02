import { cn } from "@ludocode/design-system/cn-utils";
import { Spinner } from "@ludocode/external/ui/spinner";
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
