import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../../constants/qk";
import type { ChangeCourseType } from "../../../Types/Request/ChangeCourseType";
import { CHANGE_COURSE } from "../../../constants/apiPaths";

interface ChangeCourseVariables {
  newCourse: number;
}

export function useChangeCourse() {
  const qc = useQueryClient();

  return useMutation<ChangeCourseType, Error, ChangeCourseVariables>({
    mutationFn: async (
      variables: ChangeCourseVariables
    ): Promise<ChangeCourseType> => {
      const { newCourse } = variables;

      const res = await fetch(CHANGE_COURSE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newCourse }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to change course");

      const data = (await res.json()) as ChangeCourseType;
      return data;
    },
    onSuccess: (updatedCourse: ChangeCourseType) => {
      const updatedUser = updatedCourse.user;
      const newCourseProgress = updatedCourse.courseProgress;
      qc.setQueryData(qk.user(updatedUser.id), updatedUser);
      qc.invalidateQueries({ queryKey: ["courseProgress", "pending"] });
      qc.setQueryData(qk.currentUser(), updatedUser);
    },
  });
}
