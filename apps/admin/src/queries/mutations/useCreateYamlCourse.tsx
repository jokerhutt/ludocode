import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { mutations } from "@/queries/definitions/mutations.ts";

export function useCreateYamlCourse() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createCourseYaml(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.courses() });
    },
  });
}
