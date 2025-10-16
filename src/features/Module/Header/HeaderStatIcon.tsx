import type { ReactNode } from "react";
import { HeroIcon, type IconName } from "../../../components/HeroIcons/HeroIcon";

type HeaderStatIconProps = {
    children: ReactNode;
    text: number | string;
};



export function HeaderStatIcon({children, text}: HeaderStatIconProps) {
  return (
    <div className="flex gap-2 w-full h-full px-6 py-1 rounded-lg bg-ludoGrayDark justify-center items-center">
      {children}
      <p className="font-bold text-xl text-center text-white">{text}</p>
    </div>
  );
}
