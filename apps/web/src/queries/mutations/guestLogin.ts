import { api } from "@/constants/api/api.ts";
import { qo } from "@/queries/definitions/queries.ts";
import { finalizeLoginResponse } from "@/queries/mutations/useFinalizeLogin.tsx";
import { ludoPost } from "@ludocode/api/fetcher.ts";
import type { LoginUserResponse, OnboardingSubmission } from "@ludocode/types";
import type { QueryClient } from "@tanstack/react-query";

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
