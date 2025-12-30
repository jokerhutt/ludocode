import { useSubmitOnboarding } from "@/hooks/Queries/Mutations/useSubmitOnboarding.tsx";
import type {
  CareerType,
  OnboardingSubmission,
} from "../../../../../../packages/types/Onboarding/OnboardingCourse.ts";
import { stepOrder, type StageKey } from "../../../../../../packages/types/Onboarding/OnboardingSteps.ts";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

type Args = { stage: StageKey };

export type UseOnboardingFlowReturn = {
  goto: (s: StageKey) => void;
  position: OnboardingPosition;
  next: () => void;
  prev: () => void;
  canAdvance: () => boolean;
  selectedCareer: CareerType | null;
  selectedCourse: string | null;
  hasProgrammingExperience: boolean | null;
  chooseCareer: (careerType: CareerType) => void;
  chooseCourse: (courseId: string) => void;
  chooseProgrammingExperience: (experience: boolean) => void;
};

export type OnboardingPosition = {
  current: number;
  total: number;
};

export function useOnboardingFlow({ stage }: Args): UseOnboardingFlowReturn {
  const nav = useNavigate();

  const submitOnboardingMutation = useSubmitOnboarding();

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

  const [selectedCareer, setSelectedCareer] = useState<CareerType | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [hasProgrammingExperience, setHasProgrammingExperience] = useState<
    boolean | null
  >(null);

  const canAdvance = useCallback(() => {
    console.log("Stage: " + stage);
    if (stage == "career" && selectedCareer != null) return true;
    if (stage == "course" && selectedCourse != null) return true;
    return false;
  }, [selectedCareer, selectedCourse]);

  const chooseCareer = useCallback((careerType: CareerType) => {
    setSelectedCareer(careerType);
  }, []);

  const chooseCourse = useCallback((courseId: string) => {
    setSelectedCourse(courseId);
  }, []);

  const chooseProgrammingExperience = useCallback((hasExperience: boolean) => {
    setHasProgrammingExperience(hasExperience);
  }, []);

  const position: OnboardingPosition = {
    current: idx,
    total: stepOrder.length,
  };

  const next = useCallback(() => {
    if (submitOnboardingMutation.isPending) return;
    if (!canAdvance) return;
    if (!atLast) goto(stepOrder[idx + 1]);
    if (atLast) {
      console.log("CH1");
      console.log("CAREER: " + JSON.stringify(selectedCareer));
      console.log("COURSE: " + JSON.stringify(selectedCourse));
      console.log("EXP: " + hasProgrammingExperience);
      if (
        selectedCareer != null &&
        selectedCourse != null &&
        hasProgrammingExperience != null
      ) {
        console.log("CH2");
        const submission: OnboardingSubmission = {
          chosenPath: selectedCareer,
          chosenCourse: selectedCourse,
          hasProgrammingExperience: hasProgrammingExperience,
        };
        submitOnboardingMutation.mutate(submission);
      }
    }
  }, [
    atLast,
    goto,
    idx,
    canAdvance,
    selectedCareer,
    selectedCourse,
    hasProgrammingExperience,
    submitOnboardingMutation,
  ]);

  return {
    goto,
    position,
    next,
    prev,
    canAdvance,
    selectedCareer,
    selectedCourse,
    hasProgrammingExperience,
    chooseCareer,
    chooseCourse,
    chooseProgrammingExperience,
  };
}
