import { NavigationIconGroup } from "@/components/design-system/blocks/group/navigation-icon-group.tsx";
import { StatsGroup } from "@/features/Hub/Stats/UI/Group/StatsGroup.tsx";
import { HeaderWithBar } from "./header-with-bar.tsx";
import { useEffect, useRef } from "react";

type AppHeaderProps = { title: string };

//TODO rename this to hub header
export function AppHeader({ title }: AppHeaderProps) {
  useEffect(() => {
    console.log("mounted app header");

    return () => {
      console.log("app header");
    };
  }, []);

  return (
    <HeaderWithBar device="Both">
      <div className="col-start-2 col-end-12 flex items-center justify-between">
        <h1 className="lg:hidden text-lg font-bold text-white">{title}</h1>
        <NavigationIconGroup groupClassName="hidden lg:flex" />
        <StatsGroup />
      </div>
    </HeaderWithBar>
  );
}
