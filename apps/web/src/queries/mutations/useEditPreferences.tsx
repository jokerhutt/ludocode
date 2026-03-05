import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";

export function useEditPreferences() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.editPreferences(),
    onSuccess: (payload) => {
      qc.setQueryData(qk.preferences(), payload);
    },
  });
}
