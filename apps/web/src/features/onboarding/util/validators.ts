import type { StageKey } from "@ludocode/types";
import type { OnboardingDraft } from "@/features/onboarding/store/OnboardingDraft";
import { stepOrder } from "@/features/onboarding/steps/OnboardingSteps";

const validators: Record<StageKey, (d: OnboardingDraft) => boolean> = {
  name: (d) => !!d.username && d.username.trim().length >= 3,
  career: (d) => !!d.career,
  course: (d) => !!d.course,
  experience: (d) => typeof d.experience === "boolean",
};

export function canAdvanceStage(stage: StageKey, d: OnboardingDraft): boolean {
  return validators[stage](d);
}

export function firstInvalidStep(d: OnboardingDraft): StageKey | null {
  for (const step of stepOrder) {
    if (!validators[step](d)) return step;
  }
  return null;
}