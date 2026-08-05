import { api } from "@/constants/api/api.ts";
import { ludoPost } from "@ludocode/api/fetcher.ts";
import type { LoginUserResponse, OnboardingSubmission } from "@ludocode/types";
import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { qk } from "@/queries/definitions/qk.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { qo } from "@/queries/definitions/queries.ts";

export async function finalizeLoginResponse(
  { user, userCoins, userStreak, userXp }: LoginUserResponse,
  queryClient: QueryClient,
) {
  queryClient.setQueryData(qk.user(user.id), user);
  queryClient.setQueryData(qk.currentUser(), user);
  queryClient.setQueryData(qk.userCoins(user.id), userCoins);
  queryClient.setQueryData(qk.xp(user.id), userXp);
  queryClient.setQueryData(qk.streak(user.id), userStreak);

  if (!user.hasOnboarded) {
    queryClient.setQueryData(qk.onboardingDraft(), {
      username: user.displayName?.trim() || undefined,
    });

    return ludoNavigation.onboarding.start();
  }

  const currentCourseId = await queryClient.ensureQueryData(
    qo.currentCourseId(),
  );
  const currentCourseProgress = await queryClient.ensureQueryData(
    qo.courseProgress(currentCourseId),
  );

  return ludoNavigation.hub.module.toModule(
    currentCourseProgress.courseId,
    currentCourseProgress.moduleId,
    true,
  );
}

export function useLoginResponseHandler() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return async (loginResponse: LoginUserResponse) => {
    const navigation = await finalizeLoginResponse(loginResponse, queryClient);
    router.navigate(navigation);
  };
}

export function useFinalizeLogin() {
  const handleLoginResponse = useLoginResponseHandler();

  return async (idToken: string) => {
    const loginResponse: LoginUserResponse = await ludoPost(
      api.auth.firebase,
      {},
      true,
      { Authorization: `Bearer ${idToken}` },
    );

    await handleLoginResponse(loginResponse);
  };
}

async function createGuestOnboardingData(
  queryClient: QueryClient,
): Promise<OnboardingSubmission> {
  const [courses, careers] = await Promise.all([
    queryClient.ensureQueryData(qo.allCourses()),
    queryClient.ensureQueryData(qo.allCareers()),
  ]);

  const publishedCourses = courses.filter(
    (course) => course.courseStatus === "PUBLISHED",
  );
  const eligibleCourses =
    publishedCourses.length > 0 ? publishedCourses : courses;
  const career =
    careers.find((career) =>
      eligibleCourses.some((course) => course.id === career.defaultCourseId),
    ) ?? careers[0];
  const course =
    eligibleCourses.find((course) => course.id === career?.defaultCourseId) ??
    eligibleCourses[0];

  if (!career || !course) {
    throw new Error("Cannot create guest account without onboarding options.");
  }

  return {
    selectedUsername: `guest`,
    chosenPath: career.choice,
    chosenCourse: course.id,
    hasProgrammingExperience: false,
  };
}

export async function loginAsGuest(queryClient: QueryClient) {
  const onboardingData = await createGuestOnboardingData(queryClient);

  const loginResponse = await ludoPost<LoginUserResponse, OnboardingSubmission>(
    api.auth.guest,
    onboardingData,
    true,
  );

  return finalizeLoginResponse(loginResponse, queryClient);
}
