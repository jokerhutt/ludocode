import type { ReactNode } from "react";

type CommonHeaderProps = {
  children: ReactNode;
  bgColor?: string;

  device?: "Mobile" | "Desktop" | "Both";
};

export function CommonHeader({
  children,
  bgColor = "bg-ludoGrayLight",
  device = "Mobile"
}: CommonHeaderProps) {

  const visibility = device == "Both" ? "grid" : device == "Desktop" ? "hidden lg:grid" : "lg:hidden";

  return (
    <nav
      className={`col-span-full ${visibility} grid border-b-2 border-b-ludoGrayLightShadow grid-cols-12 min-h-18 ${bgColor}`}
    >
      {children}
    </nav>
  );
}
