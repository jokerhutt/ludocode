import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
import type { LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Args = {
  courseId: string;
};

export type ChangeCourseIconRequest = {
  iconName: IconName;
};

export function useChangeCourseIcon({ courseId }: Args) {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.changeCourseIcon(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
