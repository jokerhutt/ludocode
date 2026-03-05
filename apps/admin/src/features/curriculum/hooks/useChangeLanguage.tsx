import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  courseId: string;
};

export function useChangeLanguage({ courseId }: Args) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeCourseLanguage(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
