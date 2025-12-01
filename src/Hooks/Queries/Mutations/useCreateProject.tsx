import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import { qk } from "@/constants/queries/qk";
import type { ProjectListResponse } from "@/Types/Playground/ProjectListResponse";

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
