import { cn } from "../cn-utils.ts";
import type { ReactNode } from "react";

type AsideProps = {
  children: ReactNode;
  orientation: "LEFT" | "RIGHT_WIDE";
  className?: string;
  innerClassName?: string;
};

export function Aside({
  children,
  className,
  innerClassName,
}: AsideProps) {

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
