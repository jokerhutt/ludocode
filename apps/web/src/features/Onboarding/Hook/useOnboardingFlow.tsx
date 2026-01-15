import { useSubmitOnboarding } from "@/hooks/Queries/Mutations/useSubmitOnboarding.tsx";
import type {
  OnboardingSubmission,
  StageKey,
} from "@ludocode/types/Onboarding/OnboardingCourse.ts";
import { stepOrder } from "@/features/Onboarding/Steps/OnboardingSteps";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useOnboardingDraft } from "./useOnboardingDraft";
import { canAdvanceStage } from "../Util/validators";

type Args = { stage: StageKey };

export type OnboardingPosition = {
  current: number;
  total: number;
};

export type UseOnboardingFlowReturn = {
  goto: (s: StageKey) => void;
  position: OnboardingPosition;
  next: () => void;
  prev: () => void;
  showBack: boolean;
  canAdvance: boolean;
};

export function useOnboardingFlow({ stage }: Args): UseOnboardingFlowReturn {
  const nav = useNavigate();
  const submitOnboardingMutation = useSubmitOnboarding();
  const { draft } = useOnboardingDraft();

  const idx = stepOrder.indexOf(stage);
  const atFirst = idx <= 0;
  const atLast = idx >= stepOrder.length - 1;

  const goto = useCallback(
    (s: StageKey) => nav({ to: "/onboarding/$stage", params: { stage: s } }),
    [nav]
  );

  const prev = useCallback(() => {
    if (!atFirst) goto(stepOrder[idx - 1]);
  }, [atFirst, goto, idx]);

  const canAdvance = canAdvanceStage(stage, draft);

  const next = useCallback(() => {
    if (submitOnboardingMutation.isPending) return;
    if (!canAdvance) return;

    if (!atLast) {
      goto(stepOrder[idx + 1]);
      return;
    }

    const submission: OnboardingSubmission = {
      selectedUsername: draft.username!,
      chosenPath: draft.career!,
      chosenCourse: draft.course!,
      hasProgrammingExperience: draft.experience!,
    };

    submitOnboardingMutation.mutate(submission);
  }, [atLast, canAdvance, draft, goto, idx, submitOnboardingMutation]);

  return {
    goto,
    position: { current: idx, total: stepOrder.length },
    next,
    prev,
    canAdvance,
    showBack: !atFirst,
  };
}
