import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  courseId: string;
};

export function useDeleteCourse({ courseId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteCourse(courseId),
    onSuccess: async (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
