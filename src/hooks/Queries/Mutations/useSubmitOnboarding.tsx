import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "../Definitions/mutations";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";

export function useSubmitOnboarding() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitOnboarding(),
    onSuccess: (payload) => {
      const { refreshedUser, preferences, courseProgressResponse } = payload;

      qc.setQueryData(qk.user(refreshedUser.id), refreshedUser)
      qc.setQueryData(qk.currentUser(), refreshedUser)
      qc.setQueryData(qk.preferences(), preferences);
      qc.setQueryData(
        qk.courseProgress(courseProgressResponse.courseId),
        courseProgressResponse
      );
      qc.setQueryData(qk.currentCourseId(), courseProgressResponse.courseId);

      router.navigate(ludoNavigation.hub.module.toCurrent(true));
    },
  });
}
