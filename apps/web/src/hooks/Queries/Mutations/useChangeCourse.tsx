import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../Definitions/qk.ts";
import type { ChangeCourseType } from "../../../../../../packages/types/User/ChangeCourseType.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { mutations } from "../Definitions/mutations.ts";
import { useRouter } from "@tanstack/react-router";

export function useChangeCourse() {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    ...mutations.changeCourse(),
    onSuccess: (payload: ChangeCourseType) => {
      const newCourseProgress = payload.courseProgress;
      const newEnrolled = payload.enrolled;

      if (!newCourseProgress) {
        throw new Error("Malformed ChangeCourseType");
      }

      qc.setQueryData(
        qk.courseProgress(newCourseProgress.courseId),
        newCourseProgress
      );
      qc.setQueryData(qk.currentCourseId(), newCourseProgress.courseId);
      qc.setQueryData(qk.enrolled(), newEnrolled);
      router.navigate(
        ludoNavigation.hub.module.toModule(
          newCourseProgress.courseId,
          newCourseProgress.moduleId
        )
      );
    },
  });
}
