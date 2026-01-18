import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";

export function useSubmitOnboarding() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitOnboarding(),
    onSuccess: (payload) => {
      const { refreshedUser, preferences, courseProgressResponse } = payload;

      qc.setQueryData(qk.user(refreshedUser.id), refreshedUser);
      qc.setQueryData(qk.currentUser(), refreshedUser);
      qc.setQueryData(qk.preferences(), preferences);
      const { courseProgress } = courseProgressResponse;
      const { courseId, moduleId } = courseProgress;

      qc.setQueryData(qk.courseProgress(courseId), courseProgress);
      qc.setQueryData(qk.currentCourseId(), courseId);

      router.navigate(ludoNavigation.hub.module.toModule(courseId, moduleId));
    },
  });
}
