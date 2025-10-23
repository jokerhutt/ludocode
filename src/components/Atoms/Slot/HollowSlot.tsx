import type { ReactNode } from "react";

type HollowSlotProps = {
  children: ReactNode;
  gap?: string;
  hover?: boolean;
};

export function HollowSlot({ children, gap = "gap-2", hover = true}: HollowSlotProps) {

  const hoverStyle = hover ? "hover:cursor-pointer hover:bg-ludoGrayDark/50" : "";

  return (
    <div className={`flex h-full ${gap} ${hoverStyle} px-3 py-2 rounded-lg bg-ludoGrayDark justify-center items-center`}>
      {children}
    </div>
  );
}
