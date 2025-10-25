import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import type { CourseProgress } from "../../../Types/Progress/CourseProgress";
import { qo } from "../Definitions/queries";
import { qk } from "../../../constants/qk";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/ludoNavigation";

export function useResetCourseProgress() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.resetCourseProgress(),
    onSuccess: (payload: CourseProgress) => {
      qc.setQueryData(qk.courseProgress(payload.courseId), payload);
      qc.invalidateQueries({ queryKey: ["lesson"] });
      qc.invalidateQueries({ queryKey: ["module"] });
      router.navigate(ludoNavigation.module.toModule(payload.courseId, payload.moduleId));
    },
  });
}
