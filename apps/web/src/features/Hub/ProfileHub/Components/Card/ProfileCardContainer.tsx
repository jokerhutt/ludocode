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
    <div
      className={cn(
        "w-full flex gap-3 flex-col rounded-xl border border-white/5 bg-white/1 p-4",
        className,
      )}
    >
      {header && (
        <p className="text-xs uppercase tracking-widest text-ludo-white/70 font-semibold">
          {header}
        </p>
      )}
      {children}
    </div>
  );
}
