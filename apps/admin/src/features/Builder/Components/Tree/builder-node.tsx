import type { ReactNode } from "react";

type BuilderNodeProps = {
  title: string;
  isSelected?: boolean;
  onSelect?: () => void;
  status: boolean;
  children: ReactNode;
};

export function BuilderNode({
  title,
  onSelect,
  children,
  isSelected,
}: BuilderNodeProps) {
  return (
    <div
      onClick={() => onSelect?.()}
      className={`w-full py-1.5 ${isSelected ? "border-ludo-accent-muted" : "border-ludo-accent-muted/30"} my-2 hover:cursor-pointer px-4 border rounded-md flex justify-between`}
    >
      <p className="text-lg">{title}</p>
      <div className="flex items-center gap-4">{children}</div>
    </div>
  );
}
