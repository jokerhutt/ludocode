import { HeaderWithBar } from "@ludocode/design-system/zones/header-shell";
import { AdminNavigationIconGroup } from "./AdminNavigationIconGroup";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";

export function AdminHubHeader() {
  const { data: features } = useSuspenseQuery(qo.activeFeatures());
  const isInDemo = features.authMode == "DEMO";
  const bannerText = isInDemo
    ? "Demo mode is enabled. Do not share the app until Firebase auth is enabled."
    : undefined;

  return (
    <HeaderWithBar bannerText={bannerText} device="Both">
      <div className="col-start-2 col-end-12 flex items-center justify-start">
        <h1 className="lg:hidden text-lg font-bold text-white">
          Ludocode Admin Hub
        </h1>
        <AdminNavigationIconGroup />
      </div>
    </HeaderWithBar>
  );
}
