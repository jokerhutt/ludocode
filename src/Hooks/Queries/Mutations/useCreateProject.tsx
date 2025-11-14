import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import type { CreateProjectRequest } from "@/Types/Playground/CreateProjectRequest";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { qk } from "@/constants/qk";
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
