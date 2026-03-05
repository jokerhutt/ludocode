// queries/useDeleteSubject.ts
import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { qk } from "@/hooks/Queries/Definitions/qk";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = { subjectId: number };

export function useDeleteSubject({ subjectId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteSubject(subjectId),
    onSuccess: (payload: SubjectsDraftSnapshot[]) => {
      qc.setQueryData(qk.subjects(), payload);
    },
  });
}