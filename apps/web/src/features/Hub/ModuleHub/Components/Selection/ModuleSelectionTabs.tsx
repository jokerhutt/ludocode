import { cn } from "../../../../../../../../packages/design-system/cn-utils.ts";
import { HeaderTab } from "../../../../../../../../packages/design-system/primitives/tab.tsx";

type ModuleSelectionBarProps = {
  activeTab: MobileModuleTabs;
  changeTab: (tab: MobileModuleTabs) => void;
  className?: string;
};

export type MobileModuleTabs = "Path" | "Modules";

export function ModuleSelectionTabs({
  className,
  activeTab,
  changeTab,
}: ModuleSelectionBarProps) {
  const availableTabs: MobileModuleTabs[] = ["Path", "Modules"];

  return (
    <div
      className={cn(
        "h-12 grid grid-cols-[1fr_1fr] border-b-ludoGrayDark border-b text-white w-full bg-ludoGrayLight",
        className
      )}
    >
      <HeaderTab
        className="border-r border-r-ludoGrayDark"
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
