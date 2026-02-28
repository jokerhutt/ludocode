import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";

import { onboardingDraftStore } from "@/features/Onboarding/Store/OnboardingDraft";

export function useSubmitOnboarding() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.submitOnboarding(),
    onSuccess: async (payload) => {
      const { refreshedUser, preferences, courseProgressResponse } = payload;

      await qc.cancelQueries({ queryKey: qk.currentUser() });

      qc.setQueryData(qk.user(refreshedUser.id), refreshedUser);
      qc.setQueryData(qk.currentUser(), refreshedUser);
      qc.setQueryData(qk.preferences(), preferences);

      const { courseProgress } = courseProgressResponse;
      const { courseId } = courseProgress;

      qc.setQueryData(qk.courseProgress(courseId), courseProgress);
      qc.setQueryData(qk.currentCourseId(), courseId);


      await router.navigate(
        ludoNavigation.subscription.toSubscriptionComparisonPage(),
      );
      onboardingDraftStore.getState().clearDraft();
    },
  });
}
