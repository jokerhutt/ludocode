import { NavigationIconGroup } from "@/features/hub/components/NavigationIconGroup.tsx";
import { StatsGroup } from "@/features/stats/components/StatsGroup.tsx";
import { SubscriptionBadge } from "@/features/subscription/shared/components/SubscriptionBadge.tsx";
import { LudoHeader } from "@ludocode/design-system/zones/ludo-header.tsx";
import { Suspense } from "react";
import { useSubscriptionContext } from "../../subscription/context/SubscriptionContext.tsx";
import { Avatar } from "@ludocode/design-system/primitives/avatar.tsx";
import { getUserAvatar } from "@/constants/avatars/avatars.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries.ts";
import { HubDrawer } from "@/features/hub/zones/HubDrawer.tsx";
import { useHeaderBanners } from "@/features/banner/hooks/useHeaderBanners.ts";
type HubHeaderProps = { title: string };

export function HubHeader({ title }: HubHeaderProps) {
  const { data: user } = useSuspenseQuery(qo.currentUser());
  const { avatarVersion, avatarIndex } = user;

  const subscription = useSubscriptionContext();
  const plan = subscription.planCode;

  const { data: features } = useSuspenseQuery(qo.activeFeatures());
  const isInDemo = features.authMode == "DEMO";
  const bannerText = isInDemo
    ? "Demo mode is enabled. Do not share the app until Firebase auth is enabled."
    : undefined;
  const { banners, hasBanners } = useHeaderBanners({
    localBanners: bannerText
      ? [{ id: "hub-demo-auth-mode", text: bannerText, type: "MAINTENANCE" }]
      : [],
  });

  const userPfpSrc = getUserAvatar(avatarVersion, avatarIndex);

  return (
    <LudoHeader>
      <LudoHeader.Shell
        className={hasBanners ? "border-none" : ""}
        device="Both"
      >
        <Suspense fallback={<div />}>
          <div className="col-start-2 col-end-12 flex items-center justify-between">
            <h1 className="lg:hidden text-lg font-bold text-ludo-white-bright">
              {title}
            </h1>
            <NavigationIconGroup groupClassName="hidden lg:flex" />
            <div className="flex justify-end gap-4 items-center">
              <StatsGroup groupClassName="gap-0 lg:gap-4" />
              <SubscriptionBadge className="hidden md:flex" tier={plan} />
              <HubDrawer
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
        <LudoHeader.Bar />
      </LudoHeader.Shell>
      <LudoHeader.Banner banners={banners} />
    </LudoHeader>
  );
}
