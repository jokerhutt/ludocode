import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations.ts";
import type { CourseProgress } from "../../../../../../packages/types/User/CourseProgress.ts";
import { qk } from "../Definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { useRouter } from "@tanstack/react-router";

export function useResetCourseProgress() {
  const qc = useQueryClient();
  const router = useRouter();

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
