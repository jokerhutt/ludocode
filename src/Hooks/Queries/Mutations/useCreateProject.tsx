import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import type { CreateProjectRequest } from "@/Types/Playground/CreateProjectRequest";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { qk } from "@/constants/qk";

export function useCreateProject() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createProject(),
    onSuccess: (payload: ProjectSnapshot[]) => {
      qc.setQueryData(qk.projects(), payload);
    },
  });
}
