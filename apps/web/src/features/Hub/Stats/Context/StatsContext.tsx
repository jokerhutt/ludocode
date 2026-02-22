import { createContext, useContext } from "react";
import type { LudoStats } from "@ludocode/types/User/LudoStats";

export const StatsContext = createContext<LudoStats | null>(null);

export function useStatsContext() {
  const ctx = useContext(StatsContext);
  if (!ctx)
    throw new Error("useStatsContext must be used inside a Group.Provider");
  return ctx;
}
