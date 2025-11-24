import { RouterBar } from "../../Atoms/Status/RouterBar";
import { useRouterBar } from "../../../Hooks/UI/useRouterBar";
import {
  HeaderShell,
  type HeaderShellProps,
} from "@/components/Molecules/Header/HeaderShell";

export type BarState = "idle" | "loading" | "loadingDone";

export function HeaderWithBar({
  children,
  className,
  device = "Both",
}: HeaderShellProps) {
  const { barState } = useRouterBar();

  return (
    <HeaderShell className={className} device={device}>
      {children}
      <RouterBar barState={barState} />
    </HeaderShell>
  );
}
