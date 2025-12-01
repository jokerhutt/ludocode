import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import { qk } from "@/constants/queries/qk";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";

export function useSubmitOnboarding() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitOnboarding(),
    onSuccess: (payload) => {
      const { preferences, courseProgressResponse } = payload;

      qc.setQueryData(qk.preferences(), preferences);
      qc.setQueryData(
        qk.courseProgress(courseProgressResponse.courseId),
        courseProgressResponse
      );
      qc.setQueryData(qk.currentCourseId(), courseProgressResponse.courseId);

      router.navigate(ludoNavigation.module.toCurrent(true));
    },
  });
}
