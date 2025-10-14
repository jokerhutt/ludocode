import type { ReactNode } from "react";
import { HeroIcon, type IconName } from "../../../components/HeroIcons/HeroIcon";

type HeaderStatIconProps = {
    children: ReactNode;
    text: number | string;
};



export function HeaderStatIcon({children, text}: HeaderStatIconProps) {
  return (
    <div className="flex gap-2 h-full px-3 rounded-xl bg-ludoGrayDark items-center">
      {children}
      <p className="font-bold text-xl text-white">{text}</p>
    </div>
  );
}
