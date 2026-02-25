import { NavigationIconGroup } from "@/features/Hub/Components/Group/navigation-icon-group.tsx";
import { StatsGroup } from "@/features/Hub/Stats/Components/Group/StatsGroup.tsx";
import { SubscriptionBadge } from "@/features/Hub/Components/Zone/SubscriptionBadge.tsx";
import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell";
import { Suspense } from "react";
import { useSubscriptionContext } from "../../Context/SubscriptionContext";
import { Avatar } from "@ludocode/design-system/primitives/avatar";
import { getUserAvatar } from "@/constants/avatars/avatars";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ProfileDrawer } from "../Drawer/ProfileDrawer";
type HubHeaderProps = { title: string };

export function HubHeader({ title }: HubHeaderProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const { avatarVersion, avatarIndex } = user;

  const subscription = useSubscriptionContext();
  const plan = subscription.planCode;

  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <HeaderWithBar device="Both">
      <Suspense fallback={<div />}>
        <div className="col-start-2 col-end-12 flex items-center justify-between">
          <h1 className="lg:hidden text-lg font-bold text-white">{title}</h1>
          <NavigationIconGroup groupClassName="hidden lg:flex" />
          <div className="flex justify-end gap-4 items-center">
            <StatsGroup groupClassName="gap-0 lg:gap-4" />
            <SubscriptionBadge className="hidden md:flex" tier={plan} />
            <ProfileDrawer
              user={user}
              plan={plan}
              trigger={
                <button type="button">
                  <Avatar
                    className="h-6 w-6 hover:cursor-pointer max-h-8 max-w-8"
                    src={userPfpSrc}
                  />
                </button>
              }
            />
          </div>
        </div>
      </Suspense>
    </HeaderWithBar>
  );
}
