import { type ReactNode } from "react";
import { RouterBar } from "../../Atoms/Progress/RouterBar";
import { useRouterBar } from "../../../Hooks/UI/useRouterBar";

type CommonHeaderProps = {
  children: ReactNode;
  bgColor?: string;

  device?: "Mobile" | "Desktop" | "Both";
};

export type BarState = "idle" | "loading" | "loadingDone";

export function CommonHeader({
  children,
  bgColor = "bg-ludoGrayLight",
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
      className={`relative col-span-full ${visibility} grid border-b-2 border-b-ludoGrayLightShadow grid-cols-12 min-h-14 ${bgColor}`}
    >
      {children}
      <RouterBar barState={barState} />
    </nav>
  );
}
