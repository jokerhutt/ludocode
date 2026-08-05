import { useMutation, useQueryClient } from "@tanstack/react-query";
import { qk } from "@/queries/definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { mutations } from "@/queries/definitions/mutations.ts";
import { useRouter } from "@tanstack/react-router";
import { router } from "@/main.tsx";

import { onboardingDraftStore } from "@/features/onboarding/store/OnboardingDraft.ts";
import { qo } from "../definitions/queries";
type Args = {
  oldStreak: number;
};

export function useSubmitLesson({ oldStreak }: Args) {
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    ...mutations.submitLesson(),
    onSuccess: (payload) => {
      if (payload.status === "DUPLICATE") {
        router.navigate(ludoNavigation.courseRoot());
        return;
      }

      const {
        newCoins,
        newStreak,
        newCourseProgress,
        newXp,
        xpGained,
        updatedCompletedLesson,
        accuracy,
      } = payload.content;

      const completionStatus = payload.status;

      const courseId = newCourseProgress.id;
      const moduleId = newCourseProgress.moduleId;
      const lessonId = updatedCompletedLesson.id;

      qc.setQueryData(qk.lesson(lessonId), updatedCompletedLesson);
      qc.setQueryData(qk.userCoins(newCoins.id), newCoins);
      qc.setQueryData(qk.streak(newCoins.id), newStreak);
      qc.setQueryData(qk.xp(newXp.id), newXp);
      qc.invalidateQueries({ queryKey: qk.streakPastWeek() });
      qc.invalidateQueries({ queryKey: qk.courseProgress(courseId) });
      qc.invalidateQueries({ queryKey: qk.courseStats(newCourseProgress.id) });
      qc.invalidateQueries({ queryKey: qk.xpHistory() });

      qc.invalidateQueries({ queryKey: qk.weeklyLeaderboard() });

      const { coins } = newCoins;
      const { current } = newStreak;

      router.navigate(
        ludoNavigation.completion.toLessonComplete(
          courseId,
          moduleId,
          lessonId,
          coins,
          accuracy,
          xpGained,
          oldStreak,
          current,
          completionStatus,
        ),
      );
    },
  });
}

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
        await router.navigate(
          ludoNavigation.hub.module.toModule(
            courseProgress.courseId,
            courseProgress.moduleId,
          ),
        );
      }

      onboardingDraftStore.getState().clearDraft();
    },
  });
}
