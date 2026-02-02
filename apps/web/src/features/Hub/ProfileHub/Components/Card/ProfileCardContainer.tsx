import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

type ProfileCardContainerProps = {
  header?: string;
  children: ReactNode;
  className?: string;
};

export function ProfileCardContainer({
  header,
  children,
  className,
}: ProfileCardContainerProps) {
  return (
    <div className={cn("w-full flex gap-2 flex-col", className)}>
      {header && (
        <p
          className={cn("text-lg text-ludoAltText font-bold")}
        >
          {header}
        </p>
      )}
      {children}
    </div>
  );
}
