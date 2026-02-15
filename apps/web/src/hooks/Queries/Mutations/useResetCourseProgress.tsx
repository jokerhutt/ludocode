import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import type { CourseProgress } from "@ludocode/types/User/CourseProgress.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";

export function useResetCourseProgress() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.resetCourseProgress(),
    onSuccess: (payload: CourseProgress) => {
      qc.setQueryData(qk.courseProgress(payload.courseId), payload);
      qc.invalidateQueries({ queryKey: ["lesson"] });
      qc.invalidateQueries({ queryKey: ["module"] });
      qc.invalidateQueries({queryKey: qk.courseStats(payload.courseId)})
      router.navigate(
        ludoNavigation.hub.module.toModule(payload.courseId, payload.moduleId, true)
      );
    },
  });
}
