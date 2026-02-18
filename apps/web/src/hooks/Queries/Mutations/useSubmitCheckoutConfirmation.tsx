import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import { qk } from "../Definitions/qk";
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
