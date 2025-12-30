import { NavigationIconGroup } from "@/features/Hub/Components/Group/navigation-icon-group.tsx";
import { FooterShell } from "../../../../../../../packages/design-system/zones/footer-shell.tsx";

export function NavigationFooter() {
  return (
    <FooterShell className="lg:hidden border-t border-t-ludoGrayDark">
      <div className="col-span-full flex justify-center items-center">
        <NavigationIconGroup
          groupClassName="gap-4"
          buttonClassName="text-sm px-3"
        />
      </div>
    </FooterShell>
  );
}
