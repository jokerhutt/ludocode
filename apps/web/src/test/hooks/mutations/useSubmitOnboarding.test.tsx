import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";

import { useSubmitOnboarding } from "@/hooks/Queries/Mutations/useSubmitOnboarding";
import { qk } from "@/hooks/Queries/Definitions/qk";

import type { OnboardingResponse } from "@ludocode/types/Onboarding/OnboardingResponse";
import type { OnboardingSubmission } from "@ludocode/types/Onboarding/OnboardingCourse";
import type { UUID } from "crypto";

const { navigateSpy } = vi.hoisted(() => ({
  navigateSpy: vi.fn(),
}));

vi.mock("@/main", () => ({
  router: {
    navigate: navigateSpy,
  },
}));

vi.mock("@/hooks/Queries/Definitions/mutations.ts", () => ({
  mutations: {
    submitOnboarding: vi.fn(),
  },
}));

import { mutations } from "@/hooks/Queries/Definitions/mutations.ts";

function wrapperWithClient(qc: QueryClient) {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
}

beforeEach(() => {
  navigateSpy.mockClear();
});

describe("useSubmitOnboarding", () => {
  it("writes onboarding payload to cache + navigates", async () => {
    const qc = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const vars: OnboardingSubmission = {
      selectedUsername: "Dave",
      chosenPath: "DATA",
      chosenCourse: "course-1",
      hasProgrammingExperience: true,
    };

    const payload: OnboardingResponse = {
      refreshedUser: {
        id: "u1",
        displayName: "Dave",
        avatarVersion: "v1",
        avatarIndex: 0,
        email: "ludocode@test.com",
        hasOnboarded: true,
        createdAt: new Date().toISOString(),
      },
      preferences: {
        userId: "00000000-0000-0000-0000-000000000000" as UUID,
        hasExperience: true,
        chosenPath: {
          careerType: "DATA",
          title: "Data",
          description: "Data track",
          topPath: "data",
        },
      },
      courseProgressResponse: {
        courseProgress: {
          id: "cp1",
          userId: "u1",
          courseId: "course-1",
          currentLessonId: "lesson-1",
          moduleId: "module-1",
          isComplete: false,
          updatedAt: new Date().toISOString(),
        },
        enrolled: ["course-1"],
      },
    };

    (mutations.submitOnboarding as unknown as { mockReturnValue: Function }).mockReturnValue({
      mutationFn: vi.fn().mockResolvedValue(payload),
    });

    const { result } = renderHook(() => useSubmitOnboarding(), {
      wrapper: wrapperWithClient(qc),
    });

    await act(async () => {
      await result.current.mutateAsync(vars);
    });

    expect(qc.getQueryData(qk.user("u1"))).toEqual(payload.refreshedUser);
    expect(qc.getQueryData(qk.currentUser())).toEqual(payload.refreshedUser);
    expect(qc.getQueryData(qk.preferences())).toEqual(payload.preferences);

    expect(qc.getQueryData(qk.courseProgress("course-1"))).toEqual(
      payload.courseProgressResponse.courseProgress,
    );
    expect(qc.getQueryData(qk.currentCourseId())).toEqual("course-1");

    expect(navigateSpy).toHaveBeenCalledTimes(1);
  });
});