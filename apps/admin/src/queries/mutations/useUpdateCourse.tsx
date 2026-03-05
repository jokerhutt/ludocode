import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { mutations } from "@/queries/definitions/mutations.ts";
import type { CurriculumDraft } from "@ludocode/types";

type useUpdateCourseProps = {
  courseId: string;
};

export function useUpdateCourse({ courseId }: useUpdateCourseProps) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.updateCourse(courseId),
    onSuccess: (payload: CurriculumDraft) => {
      qc.setQueryData(qk.curriculum(courseId), payload);
    },
  });
}
