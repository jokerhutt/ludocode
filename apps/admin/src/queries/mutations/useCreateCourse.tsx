import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { mutations } from "@/queries/definitions/mutations.ts";

export function useCreateCourse() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createCourse(),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
