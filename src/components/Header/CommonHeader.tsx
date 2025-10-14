import type { ReactNode } from "react";

type CommonHeaderProps = {
    children: ReactNode;
    bgColor?: string;
}

export function CommonHeader({ children, bgColor="bg-ludoGrayLight" }: CommonHeaderProps) {
  return (
    <nav className={`col-span-full top-0 z-2 sticky grid grid-cols-12 min-h-16 ${bgColor}`}>
        {children}
    </nav>
  );
}
