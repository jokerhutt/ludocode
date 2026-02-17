import type { UserSubscription } from "@ludocode/types";
import { createContext, useContext } from "react";

export const SubscriptionContext = createContext<UserSubscription | null>(null);

export function useSubscriptionContext() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx)
    throw new Error(
      "useSubscriptionContext must be used inside a Subscription.Provider"
    );
  return ctx;
}
