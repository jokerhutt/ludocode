import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { SubjectsDraftSnapshot } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  subjectId: number;
};

export function useUpdateSubject({ subjectId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateSubject(subjectId),
    onSuccess: (payload: SubjectsDraftSnapshot[]) => {
      qc.setQueryData(qk.subjects(), payload);
    },
  });
}
