import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type VisibilityToggleRequest = {
  value: boolean;
};

type Args = {
  courseId: string;
};

export function useToggleCourseVisibility({courseId}: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.toggleCourseVisibility(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
