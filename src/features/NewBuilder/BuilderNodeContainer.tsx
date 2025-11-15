import type { ReactNode } from "react";

type BuilderNodeContainerProps = {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
};

export function BuilderNodeContainer({
  children,
  onClick,
  isSelected,
}: BuilderNodeContainerProps) {
  return (
    <div onClick={() => onClick()} className="w-full hover:cursor-pointer rounded-xl hover:bg-ludoLightPurple/20 flex justify-between items-center px-3 py-2 ">
      {children}
    </div>
  );
}
