import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { CourseStatus, LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type ChangeCourseStatusRequest = {
  value: CourseStatus;
};

type Args = {
  courseId: string;
};

export function useChangeCourseStatus({ courseId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeCourseStatus(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
