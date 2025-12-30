import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { ProjectListResponse } from "../../../../../../packages/types/Project/ProjectListResponse.ts";

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
