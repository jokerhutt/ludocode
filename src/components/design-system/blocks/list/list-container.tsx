import type { ReactNode } from "react";
import { ListHeader, type ListHeaderProps } from "./list-header.tsx";
import { cn } from "@/components/cn-utils.ts";

type ListContainerProps = {
  children: ReactNode;
  header?: ListHeaderProps;
  className?: string;
};

export function ListContainer({
  children,
  header,
  className,
}: ListContainerProps) {
  return (
    <div
      className={cn(
        "border w-full rounded-xl border-ludoGrayLight flex flex-col items-center",
        className
      )}
    >
      {!!header && <ListHeader {...header} />}
      {children}
    </div>
  );
}
