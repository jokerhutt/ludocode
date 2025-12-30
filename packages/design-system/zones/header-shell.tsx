import { cn } from "../cn-utils.ts";
import type { ReactNode } from "react";

export type DeviceType = "Mobile" | "Desktop" | "Both";

export type HeaderShellProps = {
  children: ReactNode;
  className?: string;
  device?: DeviceType;
};

export function HeaderShell({
  children,
  className,
  device = "Both",
}: HeaderShellProps) {
  const visibility =
    device == "Both"
      ? "grid"
      : device == "Desktop"
      ? "hidden lg:grid"
      : "lg:hidden";

  return (
    <nav
      className={cn(
        `relative col-span-full grid  ${visibility} border-b border-b-ludoGrayDark lg:border-b-2 lg:border-b-ludoGrayLightShadow grid-cols-12 min-h-14 bg-ludoGrayLight`,
        className
      )}
    >
      {children}
    </nav>
  );
}
