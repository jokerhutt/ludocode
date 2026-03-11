import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import type { StageKey } from "@ludocode/types";

const { navigateSpy, submitOnboardingMutationSpy } = vi.hoisted(() => ({
  navigateSpy: vi.fn(),
  submitOnboardingMutationSpy: vi.fn(),
}));

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => navigateSpy,
  };
});

vi.mock("@/hooks/Queries/Mutations/useSubmitOnboarding.tsx", () => ({
  useSubmitOnboarding: () => ({
    mutate: submitOnboardingMutationSpy,
    isPending: false,
  }),
}));

import { useOnboardingFlow } from "@/features/onboarding/hooks/useOnboardingFlow";
import { testOnboardingMocks } from "./fixtures";
import {
  createOnboardingRouterMock,
  simulateOnboardingBeforeLoad,
} from "./testHelpers";
import { useOnboardingDraftStore } from "@/features/onboarding/store/OnboardingDraft";

describe("useOnboardingFlow (integration)", () => {
  beforeEach(() => {
    navigateSpy.mockClear();
    submitOnboardingMutationSpy.mockClear();

    // reset zustand draft between tests
    useOnboardingDraftStore.getState().clearDraft();
  });

  it("full flow => completes all onboarding steps => submits onboarding", async () => {
    let currentStage: StageKey = "name";

    const { result: flowResult, rerender: rerenderFlow } = renderHook(
      ({ stage }) => useOnboardingFlow({ stage }),
      { initialProps: { stage: currentStage } },
    );

    const routerMock = createOnboardingRouterMock(
      rerenderFlow,
      () => currentStage,
      (stage) => {
        currentStage = stage;
      },
    );

    navigateSpy.mockImplementation(routerMock.mockImplementation);

    // Step 1: Name stage
    expect(flowResult.current.position.current).toBe(0);
    expect(currentStage).toBe("name");
    expect(flowResult.current.canAdvance).toBe(false);

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ username: "TestUser123" });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ username: "" });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(false);
    });

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ username: "TestUser123" });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    // Advance to career stage
    act(() => {
      flowResult.current.next();
    });

    await waitFor(() => {
      expect(currentStage).toBe("career");
      expect(flowResult.current.position.current).toBe(1);
    });

    // Step 2: Career stage
    expect(flowResult.current.canAdvance).toBe(false);

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ career: "DATA" });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    // Advance to course stage
    act(() => {
      flowResult.current.next();
    });

    await waitFor(() => {
      expect(currentStage).toBe("course");
      expect(flowResult.current.position.current).toBe(2);
    });

    // Step 3: Course stage
    expect(flowResult.current.canAdvance).toBe(false);

    act(() => {
      useOnboardingDraftStore.getState().setDraft({
        course: testOnboardingMocks.courseContent[0].courseId,
      });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    // Advance to experience stage
    act(() => {
      flowResult.current.next();
    });

    await waitFor(() => {
      expect(currentStage).toBe("experience");
      expect(flowResult.current.position.current).toBe(3);
    });

    // Step 4: Experience stage
    expect(flowResult.current.canAdvance).toBe(false);

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ experience: false });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    // Submit onboarding
    act(() => {
      flowResult.current.next();
    });

    await waitFor(() => {
      expect(submitOnboardingMutationSpy).toHaveBeenCalledWith({
        selectedUsername: "TestUser123",
        chosenPath: "DATA",
        chosenCourse: testOnboardingMocks.courseContent[0].courseId,
        hasProgrammingExperience: false,
      });
    });
  });

  it("hasCompletedSomeSteps => Refreshes => goesBackToFirst", async () => {
    let currentStage: StageKey = "name";

    const { result: flowResult, rerender: rerenderFlow } = renderHook(
      ({ stage }) => useOnboardingFlow({ stage }),
      { initialProps: { stage: currentStage } },
    );

    const routerMock = createOnboardingRouterMock(
      rerenderFlow,
      () => currentStage,
      (stage) => {
        currentStage = stage;
      },
    );

    navigateSpy.mockImplementation(routerMock.mockImplementation);

    // name -> set username -> next -> career
    expect(flowResult.current.position.current).toBe(0);
    expect(currentStage).toBe("name");
    expect(flowResult.current.canAdvance).toBe(false);

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ username: "TestUser123" });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    act(() => {
      flowResult.current.next();
    });

    await waitFor(() => {
      expect(currentStage).toBe("career");
      expect(flowResult.current.position.current).toBe(1);
    });

    act(() => {
      useOnboardingDraftStore.getState().setDraft({ career: "DATA" });
    });

    await waitFor(() => {
      expect(flowResult.current.canAdvance).toBe(true);
    });

    // simulate refresh => draft wiped
    useOnboardingDraftStore.getState().clearDraft();

    // guard should kick you back to "name" if you're at "career"
    simulateOnboardingBeforeLoad("career", (nav) => {
      navigateSpy(nav);
    });

    await waitFor(() => {
      const nav = routerMock.getLastNavigation();
      expect(nav?.to).toBe("/app/onboarding/$stage");
      expect(nav?.params.stage).toBe("name");
      expect(currentStage).toBe("name");
    });
  });

  it("cannot skip stages => blocked at first invalid stage", async () => {
    let currentStage: StageKey = "name";

    const { result: flowResult } = renderHook(
      ({ stage }) => useOnboardingFlow({ stage }),
      { initialProps: { stage: currentStage } },
    );

    // Try to advance without setting username
    expect(flowResult.current.canAdvance).toBe(false);

    act(() => {
      flowResult.current.next();
    });

    await waitFor(() => {
      expect(currentStage).toBe("name");
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });
});
