import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { LudoCourse } from "../../../../../../packages/types/Catalog/LudoCourse.ts";

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
