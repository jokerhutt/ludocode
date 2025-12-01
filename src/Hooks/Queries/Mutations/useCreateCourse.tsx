import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import { qk } from "@/constants/queries/qk";
import type { LudoCourse } from "@/Types/Catalog/LudoCourse";

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
