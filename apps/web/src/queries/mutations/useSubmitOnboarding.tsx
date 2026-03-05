import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutations } from "@/queries/definitions/mutations.ts";
import { qk } from "@/queries/definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main.tsx";

import { onboardingDraftStore } from "@/features/onboarding/store/OnboardingDraft.ts";
import { qo } from "@/queries/definitions/queries.ts";

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

      const features = await qc.ensureQueryData(qo.activeFeatures());
      const isStripeEnabled = features.paymentsEnabled;
      const stripeMode = features.stripeMode;

      if (isStripeEnabled && stripeMode === "PROD") {
        await router.navigate(
          ludoNavigation.subscription.toSubscriptionComparisonPage(),
        );
      } else {
        await router.navigate(ludoNavigation.hub.module.toModule(courseProgress.courseId, courseProgress.moduleId))
      }

      onboardingDraftStore.getState().clearDraft();
    },
  });
}
