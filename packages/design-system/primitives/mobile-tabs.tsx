import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../cn-utils";

type MobileTabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const MobileTabsContext = createContext<MobileTabsContextValue | null>(null);

type MobileTabsRootProps = {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: ReactNode;
};

type MobileTabsTabProps = {
  value: string;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  badge?: ReactNode;
  children: ReactNode;
};

function MobileTabsRoot({
  value,
  onValueChange,
  className,
  children,
}: MobileTabsRootProps) {
  const contextValue = useMemo(
    () => ({ value, onValueChange }),
    [value, onValueChange],
  );

  return (
    <MobileTabsContext.Provider value={contextValue}>
      <div className={cn("flex items-center justify-between gap-2", className)}>
        {children}
      </div>
    </MobileTabsContext.Provider>
  );
}

function MobileTabsTab({
  value,
  className,
  activeClassName = "bg-ludo-surface text-ludo-white-bright",
  inactiveClassName = "bg-transparent text-ludo-white/90",
  badge,
  children,
}: MobileTabsTabProps) {
  const ctx = useContext(MobileTabsContext);
  if (!ctx) {
    throw new Error("MobileTabs.Tab must be used within MobileTabs");
  }

  const isActive = ctx.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "relative h-8 rounded-md px-3 flex-1 text-sm font-semibold",
        isActive ? activeClassName : inactiveClassName,
        className,
      )}
    >
      {children}
      {badge}
    </button>
  );
}

type MobileTabsCompound = typeof MobileTabsRoot & {
  Tab: typeof MobileTabsTab;
};

export const MobileTabs = MobileTabsRoot as MobileTabsCompound;
MobileTabs.Tab = MobileTabsTab;

export function useMobileTabs<T extends string>(initialTab: T) {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const selectTab = useCallback((tab: T) => {
    setActiveTab(tab);
  }, []);

  const isActiveTab = useCallback((tab: T) => activeTab === tab, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    selectTab,
    isActiveTab,
  };
}
