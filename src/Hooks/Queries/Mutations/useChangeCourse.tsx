import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import type { ChangeCourseType } from "../../../Types/Request/ChangeCourseType";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/ludoNavigation";
import { mutations } from "../Definitions/mutations.ts";

export function useChangeCourse() {
  const qc = useQueryClient();

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
      qc.setQueryData(qk.currentCourseId(), newCourseProgress.courseId)
      qc.setQueryData(qk.enrolled(), newEnrolled);
      router.navigate(ludoNavigation.module.toCurrent());
    },
  });
}
