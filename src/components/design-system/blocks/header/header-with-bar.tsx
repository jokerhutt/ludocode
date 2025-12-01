import { useRouterBar } from "@/hooks/UI/useRouterBar";
import { RouterBar } from "@/components/design-system/atoms/status/router-bar.tsx";
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
