import type { StageKey } from "@ludocode/types";
import type { OnboardingDraft } from "../Hook/useOnboardingDraft";
import { stepOrder } from "../Steps/OnboardingSteps";

const validators: Record<StageKey, (d: OnboardingDraft) => boolean> = {
  name: (d) => !!d.username,
  career: (d) => !!d.career,
  course: (d) => !!d.course,
  experience: (d) => d.experience != null,
};

export function canAdvanceStage(stage: StageKey, d: OnboardingDraft): boolean {
  return validators[stage](d);
}

export function firstInvalidStep(d: OnboardingDraft): StageKey | null {
  for (const step of stepOrder) {
    console.log("Step is " + step)
    if (!validators[step](d)) return step;
  }
  return null;
}
