import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";

export function useCreateProject(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createProject(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.projects() });
      closeModal?.();
    },
  });
}
