import { LudoHeader } from "@ludocode/design-system/zones/ludo-header";
import { AdminNavigationIconGroup } from "./AdminNavigationIconGroup";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/queries/definitions/queries";

export function AdminHubHeader() {
  const { data: features } = useSuspenseQuery(qo.activeFeatures());
  const isInDemo = features.authMode == "DEMO";
  const bannerText = isInDemo
    ? "Demo mode is enabled. Do not share the app until Firebase auth is enabled."
    : undefined;

  return (
    <LudoHeader>
      <LudoHeader.Shell
        className={bannerText ? "border-none" : ""}
        device="Both"
      >
        <div className="col-start-2 col-end-12 flex items-center justify-start">
          <h1 className="lg:hidden text-lg font-bold text-ludo-white-bright">
            Ludocode Admin Hub
          </h1>
          <AdminNavigationIconGroup />
        </div>
        <LudoHeader.Bar />
      </LudoHeader.Shell>
      {bannerText && <LudoHeader.Banner text={bannerText} />}
    </LudoHeader>
  );
}
