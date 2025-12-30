import { useRouterBar } from "../../../apps/web/src/hooks/UI/useRouterBar.tsx";
import { RouterBar } from "packages/design-system/primitives/router-bar.tsx";
import { HeaderShell, type HeaderShellProps } from "./header-shell.tsx";


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
