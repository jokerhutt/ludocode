import { HeaderTab } from "@/components/design-system/atoms/tab/header-tab.tsx";
import { cn } from "@/components/cn-utils.ts";

type ModuleSelectionBarProps = {
  activeTab: MobileModuleTabs;
  changeTab: (tab: MobileModuleTabs) => void;
  className?: string;
};

export type MobileModuleTabs = "Path" | "Modules";

export function ModuleSelectionBar({
  className,
  activeTab,
  changeTab,
}: ModuleSelectionBarProps) {
  const availableTabs: MobileModuleTabs[] = ["Path", "Modules"];

  return (
    <div
      className={cn(
        "h-12 grid grid-cols-[1fr_1fr] border-b-ludoLightPurple border-b text-white w-full bg-ludoGrayLight",
        className
      )}
    >
      <HeaderTab
        className="border-r border-r-ludoLightPurple"
        text={availableTabs[0]}
        onClick={() => changeTab(availableTabs[0])}
        isActive={activeTab == availableTabs[0]}
      />
      <HeaderTab
        text={availableTabs[1]}
        onClick={() => changeTab(availableTabs[1])}
        isActive={activeTab == availableTabs[1]}
      />
    </div>
  );
}
