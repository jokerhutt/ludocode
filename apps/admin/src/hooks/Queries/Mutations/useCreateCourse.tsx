import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { mutations } from "@/hooks/Queries/Definitions/mutations";

export function useCreateCourse(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createCourse(),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
      closeModal?.();
    },
  });
}
