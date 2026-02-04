import type { UserPreferences } from "@ludocode/types";
import { createContext, useContext } from "react";

export const UserPreferencesContext = createContext<UserPreferences | null>(
  null,
);

export function useUserPreferencesContext() {
  const ctx = useContext(UserPreferencesContext);
  if (!ctx)
    throw new Error(
      "useUserPreferencesContext must be used inside a UserPreferencesContext.Provider",
    );
  return ctx;
}
