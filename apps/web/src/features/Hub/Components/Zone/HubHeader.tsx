import { NavigationIconGroup } from "@/features/Hub/Components/Group/navigation-icon-group.tsx";
import { StatsGroup } from "@/features/Hub/Stats/Components/Group/StatsGroup.tsx";
import {HeaderWithBar} from "@ludocode/design-system/zones/header-shell"
type HubHeaderProps = { title: string };

export function HubHeader({ title }: HubHeaderProps) {
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
