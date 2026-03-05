import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { ProjectListResponse } from "@ludocode/types/Project/ProjectListResponse.ts";

export function useCreateProject(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createProject(),
    onSuccess: (payload: ProjectListResponse) => {
      qc.setQueryData(qk.projects(), payload);
      closeModal?.();
    },
  });
}
