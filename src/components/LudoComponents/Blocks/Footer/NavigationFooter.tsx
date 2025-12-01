import { NavigationIconGroup } from "../Group/NavigationIconGroup.tsx";
import { AppFooter } from "./AppFooter.tsx";

export function NavigationFooter() {
  return (
    <AppFooter className="lg:hidden border-t border-t-ludoLightPurple">
      <div className="col-span-full flex justify-center items-center">
        <NavigationIconGroup
          groupClassName="gap-4"
          buttonClassName="text-sm px-3"
        />
      </div>
    </AppFooter>
  );
}
