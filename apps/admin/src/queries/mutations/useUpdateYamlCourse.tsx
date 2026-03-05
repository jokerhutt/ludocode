import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { mutations } from "@/queries/definitions/mutations.ts";

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
