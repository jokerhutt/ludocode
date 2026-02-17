import { NavigationIconGroup } from "@/features/Hub/Components/Group/navigation-icon-group.tsx";
import { StatsGroup } from "@/features/Hub/Stats/Components/Group/StatsGroup.tsx";
import { SubscriptionBadge } from "@/features/Hub/Components/Zone/SubscriptionBadge.tsx";
import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell";
import { Suspense } from "react";
import { useSubscriptionContext } from "../../Context/SubscriptionContext";
type HubHeaderProps = { title: string };

export function HubHeader({ title }: HubHeaderProps) {

  return (
    <HeaderWithBar device="Both">
      <Suspense fallback={<div />}>
        <div className="col-start-2 col-end-12 flex items-center justify-between">
          <h1 className="lg:hidden text-lg font-bold text-white">{title}</h1>
          <NavigationIconGroup groupClassName="hidden lg:flex" />
          <div className="flex justify-end gap-4 items-center">
            <SubscriptionBadge tier={"PRO"} />
            <StatsGroup />
          </div>
        </div>
      </Suspense>
    </HeaderWithBar>
  );
}
