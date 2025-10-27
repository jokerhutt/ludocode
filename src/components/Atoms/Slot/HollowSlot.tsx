import type { ReactNode } from "react";

type HollowSlotProps = {
  children: ReactNode;
  gap?: string;
  hover?: boolean;
  padding?: string;
  active?: boolean;
  onClick?: () => void;
};

export function HollowSlot({ children, gap = "gap-2", hover = true, padding = "px-3 py-2", active, onClick}: HollowSlotProps) {

  const hoverStyle = hover && active ? "hover:bg-ludoLightPurple/80 hover:cursor-pointer" : hover ? "hover:cursor-pointer hover:bg-ludoGrayDark/50" : "";
  const activeStyle = active ? "bg-ludoLightPurple/60" : "bg-ludoGrayDark"

  return (
    <div onClick={() => onClick?.()} className={`flex h-full ${gap} ${hoverStyle} ${padding} ${activeStyle} rounded-lg  justify-center items-center`}>
      {children}
    </div>
  );
}
