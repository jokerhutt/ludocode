import { AlreadySubscribedPage } from "@/features/subscription/comparison/AlreadySubscribedPage.tsx";
import { qo } from "@/queries/definitions/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";

export function SubscribedGuardPage() {
  const { data: subscription } = useSuspenseQuery(qo.subscription());

  if (subscription.planCode != "FREE") {
    return <AlreadySubscribedPage />;
  } else return <Outlet />;
}
