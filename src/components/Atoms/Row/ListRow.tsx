import type { ReactNode } from "react";

type ListRowProps = {
  hover?: boolean;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  alignment?: "start" | "center" | "end" | "between"
  fill?: boolean
  py?: string
  px?: string
};

export function ListRow({hover, children, active, onClick, alignment = "start", fill, py = "py-4", px = "px-2"}: ListRowProps) {

  const hoverStyle = hover ? "hover:bg-ludoGrayLight/20" : ""
  const activeStyle = active ? "bg-white/5" : ""
  const bg = fill ? "bg-ludoGrayLight border-b-ludoGrayDark" : "border-b-ludoGrayLight"

  const orientation = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between"
  }

  return (
    <div
      onClick={() => onClick?.()}
      className={`text-white ${hoverStyle} flex items-center ${bg} ${orientation[alignment]} ${activeStyle} hover:cursor-pointer w-full ${py} ${px} text-lg border-b `}
    >
      <p>
        {children}
      </p>
    </div>
  );
}
