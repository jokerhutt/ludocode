import type { ReactNode } from "react";

type FileWrapperProps = {
  children: ReactNode;
  isSelected: boolean;
  onClick?: React.MouseEventHandler;
};

export function FileWrapper({
  children,
  isSelected,
  onClick,
}: FileWrapperProps) {
  return (
    <button
      onClick={(e) => {
        onClick?.(e);
      }}
      className={`flex w-full gap-8 px-2 py-1 justify-between rounded-lg hover:cursor-pointer items-center ${
        isSelected ? "bg-ludoLightPurple/70" : "hover:bg-ludoLightPurple/50"
      }`}
    >
      {children}
    </button>
  );
}
