import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import { qk } from "../Definitions/qk.ts";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/navigator/ludoNavigation.tsx";

export function useResetCourseProgress() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.resetCourseProgress(),
    onSuccess: (payload: CourseProgress) => {
      qc.setQueryData(qk.courseProgress(payload.courseId), payload);
      qc.invalidateQueries({ queryKey: ["lesson"] });
      qc.invalidateQueries({ queryKey: ["module"] });
      router.navigate(
        ludoNavigation.hub.module.toModule(payload.courseId, payload.moduleId)
      );
    },
  });
}
