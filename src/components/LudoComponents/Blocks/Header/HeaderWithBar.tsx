import { useRouterBar } from "@/Hooks/UI/useRouterBar";
import { RouterBar } from "../../Atoms/Status/RouterBar";
import { HeaderShell, type HeaderShellProps } from "./HeaderShell";


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
