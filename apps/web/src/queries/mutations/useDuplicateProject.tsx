import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../definitions/mutations";
import { qk } from "../definitions/qk";

interface UseDuplicateProjectOptions {
  onSuccess?: (newProjectId: string) => void | Promise<void>;
}

export function useDuplicateProject(
  pid: string,
  options?: UseDuplicateProjectOptions,
) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.duplicateProject(pid),
    onSuccess: async (newProjectId) => {
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.projects() }),
        qc.invalidateQueries({ queryKey: qk.project(pid) }),
      ]);

      await options?.onSuccess?.(newProjectId);
    },
  });
}
