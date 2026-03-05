import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { UserSubscription } from "@ludocode/types";


export function useSubmitCheckoutConfirmation() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitCheckoutConfirmation(),
    onSuccess: (payload: UserSubscription) => {
      qc.setQueryData(qk.subscription(), payload);
    },
  });
}
