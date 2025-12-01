import { cn } from "@/components/utils";
import type { ReactNode } from "react";
import type { string } from "zod";

type AsideComponentProps = {
  children: ReactNode;
  orientation: "LEFT" | "RIGHT" | "RIGHT_WIDE";
  className?: string;
  innerClassName?: string;
};

export function AsideComponent({
  children,
  orientation,
  className,
  innerClassName,
}: AsideComponentProps) {
  const border =
    orientation == "RIGHT" || "RIGHT_WIDE" ? "border-l" : "border-r";
  const span =
    orientation == "RIGHT"
      ? "col-start-9 col-end-12"
      : orientation == "RIGHT_WIDE"
      ? "col-start-9 col-end-13"
      : "col-start-1 col-end-5";

  return (
    <aside
      className={cn(
        `hidden lg:block ${span} h-full ${border} border-ludoGrayLight`,
        className
      )}
    >
      <div className={cn(`sticky top-0 py-6 px-6 `, innerClassName)}>
        {children}
      </div>
    </aside>
  );
}
