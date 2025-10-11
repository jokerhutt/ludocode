import type { ReactNode } from "react";

type CommonFooterProps = {
  children: ReactNode;
      bgColor?: string;
};

export function CommonFooter({ children, bgColor="bg-ludoGrayLight" }: CommonFooterProps) {
  return (
    <footer className={`col-span-full grid grid-cols-12 min-h-24 ${bgColor}`}>
        {children}
    </footer>
  );
}
