import { cn } from "@/components/cn-utils.ts";
import type { ReactNode } from "react";

type AsideComponentProps = {
  children: ReactNode;
  orientation: "LEFT" | "RIGHT_WIDE";
  className?: string;
  innerClassName?: string;
};

export function AsideComponent({
  children,
  orientation,
  className,
  innerClassName,
}: AsideComponentProps) {
  const border = orientation == "RIGHT_WIDE" ? "border-l" : "border-r";

  return (
    <aside
      className={cn(
        `hidden lg:block aside-col-wide h-full border-ludoGrayLight`,
        className
      )}
    >
      <div className={cn(`sticky top-0 py-6 px-6 `, innerClassName)}>
        {children}
      </div>
    </aside>
  );
}
