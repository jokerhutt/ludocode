import { api } from "@/constants/api/api.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ludoPost } from "@ludocode/api/fetcher.ts";
import { mutations } from "../definitions/mutations";
import type { UserSubscription } from "@ludocode/types";
import { qk } from "../definitions/qk";

type StripeRedirectResponse = { url: string };

export function useStripeManage() {
  async function openManagePortal() {
    const { url } = await ludoPost<StripeRedirectResponse>(
      api.subscriptions.manage,
      null,
      true,
    );

    window.location.href = url;
  }

  return { openManagePortal };
}

export function useStripeCheckout() {
  async function startCheckout(planCode: string) {
    const { url } = await ludoPost<
      StripeRedirectResponse,
      { planCode: string }
    >(api.subscriptions.checkout, { planCode }, true);

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
