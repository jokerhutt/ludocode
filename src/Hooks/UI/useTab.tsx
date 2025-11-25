import { useState } from "react";

export function useTab<T extends string>(initialTab: T) {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  const setTab = (tab: T) => setActiveTab(tab);
  const isTab = (tab: T) => activeTab === tab;

  return {
    activeTab,
    setTab,
    isTab,
  };
}
