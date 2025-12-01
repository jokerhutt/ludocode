import { cn } from "@/components/cn-utils.ts";
import type { ReactNode } from "react";

type ListRowProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
  active?: boolean;
  fill?: boolean;
  alignment?: "start" | "center" | "end" | "between";
};
export function ListRow({
  children,
  onClick,
  className,
  hover = true,
  active = false,
  fill = false,
  alignment = "start",
}: ListRowProps) {
  const alignmentClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  }[alignment];

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full text-white hover:cursor-pointer text-lg border-b items-stretch px-2 py-4",
        alignmentClass,
        fill
          ? "bg-ludoGrayLight border-b-ludoGrayDark"
          : "border-b-ludoGrayLight",
        hover && "hover:bg-ludoGrayLight/20 hover:cursor-pointer",
        active && "bg-ludoGrayLight/70 hover:bg-ludoGrayLight/40",
        className
      )}
    >
      {children}
    </div>
  );
}
