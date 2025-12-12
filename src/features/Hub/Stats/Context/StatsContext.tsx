import { createContext, useContext } from "react";
import type { LudoStats } from "@/types/User/LudoStats.ts";

export const StatsContext = createContext<LudoStats | null>(null);

export function useStatsContext() {
  const ctx = useContext(StatsContext);
  if (!ctx)
    throw new Error("useStatsContext must be used inside a Stats.Provider");
  return ctx;
}
