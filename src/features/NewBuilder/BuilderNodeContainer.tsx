import type { ReactNode } from "react";

type BuilderNodeContainerProps = {
  children: ReactNode;
  isSelected: boolean;
};

export function BuilderNodeContainer({
  children,
  isSelected,
}: BuilderNodeContainerProps) {
  const style = isSelected
    ? "border border-ludoLightPurple"
    : "border border-ludoLightPurple/20";

  return (
    <div
      className={`w-full hover:cursor-pointer rounded-xl ${style} flex justify-between items-center px-3 py-2`}
    >
      {children}
    </div>
  );
}
