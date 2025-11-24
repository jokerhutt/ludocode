import { HeaderWithBar } from "./HeaderWithBar.tsx";
import { NavigationIconGroup } from "@/components/Organisms/NavigationIconGroup.tsx";
import { StatsGroup } from "@/components/Organisms/StatsGroup.tsx";

type DesktopHeaderProps = {};

export function DesktopHeader({}: DesktopHeaderProps) {
  return (
    <HeaderWithBar device="Desktop">
      <div className="col-start-2 col-end-12 flex items-center justify-between">
        <NavigationIconGroup />
        <StatsGroup />
      </div>
    </HeaderWithBar>
  );
}
