import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { mutations } from "@/hooks/Queries/Definitions/mutations";

export function useCreateYamlCourse() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createCourseYaml(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.courses() });
    },
  });
}
