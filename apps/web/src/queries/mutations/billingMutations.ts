import { api } from "@/constants/api/api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../definitions/mutations";
import type { UserSubscription } from "@ludocode/types";
import { qk } from "../definitions/qk";

export function useStripeManage() {
  async function openManagePortal() {
    const res = await fetch(api.subscriptions.manage, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to create billing portal session");
    }

    const { url } = await res.json();

    window.location.href = url;
  }

  return { openManagePortal };
}

export function useStripeCheckout() {
  async function startCheckout(planCode: string) {
    const res = await fetch(api.subscriptions.checkout, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planCode }),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { url } = await res.json();

    window.location.href = url;
  }

  return { startCheckout };
}

export function useSubmitCheckoutConfirmation() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitCheckoutConfirmation(),
    onSuccess: (payload: UserSubscription) => {
      qc.setQueryData(qk.subscription(), payload);
    },
  });
}
