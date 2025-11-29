import type { ReactNode } from "react";

type FileWrapperProps = {
  children: ReactNode;
  isSelected: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export function FileWrapper({
  children,
  isSelected,
  onClick,
}: FileWrapperProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={`flex gap-8 px-2 py-1 justify-between rounded-lg hover:cursor-pointer items-center ${
        isSelected ? "bg-ludoLightPurple/70" : "hover:bg-ludoLightPurple/50"
      }`}
    >
      {children}
    </div>
  );
}
