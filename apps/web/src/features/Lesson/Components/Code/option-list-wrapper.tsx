import { cn } from "../../../../../../../packages/design-system/cn-utils.ts";
import type { ReactNode } from "react";

type OptionListWrapperProps = {
  children: ReactNode;
  type: "ROW" | "COLUMN";
  className?: string;
};

export function OptionListWrapper({
  children,
  type,
  className,
}: OptionListWrapperProps) {
  const rowStyle = "flex justify-center flex-wrap items-center gap-4";
  const colStyle = "flex flex-col items-center gap-6";

  const style = type == "ROW" ? rowStyle : colStyle;

  return (
    <div className={cn(`w-full hover:cursor-pointer`, style, className)}>
      {children}
    </div>
  );
}
