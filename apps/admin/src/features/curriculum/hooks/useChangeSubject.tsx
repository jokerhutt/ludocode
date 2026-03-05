import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import type { LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  courseId: string;
};

export function useChangeSubject({ courseId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeCourseSubject(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
