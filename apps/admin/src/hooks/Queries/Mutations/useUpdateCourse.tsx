import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import type { LudoCourse } from "@ludocode/types/Catalog/LudoCourse.ts";
import { mutations } from "@/hooks/Queries/Definitions/mutations";
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
