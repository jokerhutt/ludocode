import { NavigationIconGroup } from "../Group/NavigationIconGroup.tsx";
import { StatsGroup } from "../Group/StatsGroup.tsx";
import { HeaderWithBar } from "./HeaderWithBar.tsx";

type AppHeaderProps = { title: string };

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <HeaderWithBar device="Both">
      <div className="col-start-2 col-end-12 flex items-center justify-between">
        <h1 className="lg:hidden text-lg font-bold text-white">{title}</h1>
        <NavigationIconGroup groupClassName="hidden lg:flex" />
        <StatsGroup />
      </div>
    </HeaderWithBar>
  );
}
