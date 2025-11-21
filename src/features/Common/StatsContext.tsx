import { createContext, useContext } from "react";
import type { UserCoins } from "../../Types/User/UserCoins";
import type { LudoStats } from "@/Types/User/LudoStats";


export const StatsContext = createContext<LudoStats | null>(null);

export function useStatsContext() {
  const ctx = useContext(StatsContext);
  if (!ctx)
    throw new Error("useStatsContext must be used inside a Stats.Provider");
  return ctx;
}
