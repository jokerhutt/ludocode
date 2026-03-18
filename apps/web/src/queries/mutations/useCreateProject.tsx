import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { ProjectCardListResponse } from "@ludocode/types";

export function useCreateProject(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createProject(),
    onSuccess: (payload: ProjectCardListResponse) => {
      qc.setQueryData(qk.projects(), payload);
      closeModal?.();
    },
  });
}
