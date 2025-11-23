import { type ReactNode } from "react";
import { RouterBar } from "../../Atoms/Status/RouterBar";
import { useRouterBar } from "../../../Hooks/UI/useRouterBar";
import { cn } from "@/lib/utils";

type CommonHeaderProps = {
  children: ReactNode;
  bgColor?: string;
  className?: string;
  device?: "Mobile" | "Desktop" | "Both";
};

export type BarState = "idle" | "loading" | "loadingDone";

export function CommonHeader({
  children,
  bgColor = "bg-ludoGrayLight",
  className,
  device = "Mobile",
}: CommonHeaderProps) {
  const { barState } = useRouterBar();

  const visibility =
    device == "Both"
      ? "grid"
      : device == "Desktop"
      ? "hidden lg:grid"
      : "lg:hidden";

  return (
    <nav
      className={cn(
        `relative col-span-full ${visibility} grid border-b-2 border-b-ludoGrayLightShadow grid-cols-12 min-h-14 ${bgColor}`,
        className
      )}
    >
      {children}
      <RouterBar barState={barState} />
    </nav>
  );
}
