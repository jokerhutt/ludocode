import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { mutations } from "@/hooks/Queries/Definitions/mutations";

type UseUpdateYamlCourseProps = {
  courseId: string;
};

export function useUpdateYamlCourse({ courseId }: UseUpdateYamlCourseProps) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateCourseYaml(courseId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.courses() });
      qc.invalidateQueries({ queryKey: qk.curriculum(courseId) });
    },
  });
}
