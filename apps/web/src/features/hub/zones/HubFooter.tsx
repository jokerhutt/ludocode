import { NavigationIconGroup } from "@/features/hub/components/NavigationIconGroup.tsx";
import { FooterShell } from "@ludocode/design-system/zones/footer-shell.tsx";

export function HubFooter() {
  return (
    <FooterShell className="lg:hidden border-t border-t-ludo-background">
      <div className="col-span-full flex justify-center items-center">
        <NavigationIconGroup
          dataTestIdPrefix="footer"
          groupClassName="gap-4"
          buttonClassName="text-sm px-3"
        />
      </div>
    </FooterShell>
  );
}
