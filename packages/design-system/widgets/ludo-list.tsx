import { cn } from "@ludocode/design-system/cn-utils";
import type { ReactNode } from "react";

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
        "border w-full rounded-lg border-ludo-surface flex flex-col items-center",
        className
      )}
    >
      {!!header && <ListHeader {...header} />}
      {children}
    </div>
  );
}

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
          ? "bg-ludo-surface border-b-ludo-background"
          : "border-b-ludo-surface",
        hover && "hover:bg-ludo-surface/20 hover:cursor-pointer",
        active && "bg-ludo-surface/70 hover:bg-ludo-surface/40",
        className
      )}
    >
      {children}
    </div>
  );
}

export type ListHeaderProps = {
  title: string;
  onClick?: () => void;
  className?: string;
};

export function ListHeader({ title, className }: ListHeaderProps) {
  return (
    <div
      className={cn(
        `border-b bg-ludo-surface rounded-t-lg border-ludo-surface w-full`,
        className
      )}
    >
      <p className="text-white text-xl font-bold p-2 text-center">{title}</p>
    </div>
  );
}