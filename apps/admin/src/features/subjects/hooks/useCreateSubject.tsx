import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateSubject() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createSubject(),
    onSuccess: (payload: SubjectsDraftSnapshot[]) => {
      qc.setQueryData(qk.subjects(), payload);
    },
  });
}