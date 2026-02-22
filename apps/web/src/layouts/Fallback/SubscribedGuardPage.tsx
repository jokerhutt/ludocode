import { AlreadySubscribedPage } from "@/features/Subscription/Misc/AlreadySubscribedPage";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";

export function SubscribedGuardPage() {
  const { data: subscription } = useSuspenseQuery(qo.subscription());

  if (subscription.planCode != "FREE") {
    return <AlreadySubscribedPage />;
  } else return <Outlet />;
}
