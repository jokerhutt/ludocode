import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import type { ChangeCourseType } from "../../../Types/Request/ChangeCourseType";
import { CHANGE_COURSE } from "../../../constants/pathConstants.ts";
import { router } from "../../../routes/router";
import { ludoNavigation } from "../../../routes/ludoNavigation";

interface ChangeCourseVariables {
  newCourseId: string;
}

export function useChangeCourse() {
  const qc = useQueryClient();

  return useMutation<ChangeCourseType, Error, ChangeCourseVariables>({
    mutationFn: async (
      variables: ChangeCourseVariables
    ): Promise<ChangeCourseType> => {
      const { newCourseId } = variables;

      const res = await fetch(CHANGE_COURSE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCourseId }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to change course");

      const data = (await res.json()) as ChangeCourseType;
      return data;
    },
    onSuccess: (payload: ChangeCourseType) => {
      try {
        const updatedUser = payload.user;
        const newCourseProgress = payload.courseProgress;
        const newEnrolled = payload.enrolled;

        if (!updatedUser || !newCourseProgress) {
          throw new Error("Malformed ChangeCourseType");
        }

        qc.setQueryData(qk.user(updatedUser.id), updatedUser);
        qc.setQueryData(
          qk.courseProgress(newCourseProgress.courseId),
          newCourseProgress
        );
        qc.setQueryData(qk.currentUser(), updatedUser);
        qc.setQueryData(qk.enrolled(), newEnrolled);
      } catch (e) {
        console.error("onSuccess error:", e);
      } finally {
        router.navigate(ludoNavigation.module.toCurrent());
      }
    },
  });
}
