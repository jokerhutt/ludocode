import { NavigationIconGroup } from "@/components/design-system/blocks/group/navigation-icon-group.tsx";
import { AppFooter } from "./app-footer.tsx";

export function NavigationFooter() {
  return (
    <AppFooter className="lg:hidden border-t border-t-ludoGrayDark">
      <div className="col-span-full flex justify-center items-center">
        <NavigationIconGroup
          groupClassName="gap-4"
          buttonClassName="text-sm px-3"
        />
      </div>
    </AppFooter>
  );
}
