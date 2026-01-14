import { useSubmitOnboarding } from "@/hooks/Queries/Mutations/useSubmitOnboarding.tsx";
import type {
  CareerType,
  OnboardingSubmission,
} from "@ludocode/types/Onboarding/OnboardingCourse.ts";
import {
  stepOrder,
  type StageKey,
} from "@/features/Onboarding/Templates/OnboardingSteps.ts";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import type { LudoUser } from "@ludocode/types";

type Args = { stage: StageKey; currentUser: LudoUser };

export type UseOnboardingFlowReturn = {
  goto: (s: StageKey) => void;
  position: OnboardingPosition;
  next: () => void;
  prev: () => void;
  canAdvance: () => boolean;
  selectedUsername: string;
  selectedCareer: CareerType | null;
  selectedCourse: string | null;
  hasProgrammingExperience: boolean | null;
  chooseCareer: (careerType: CareerType) => void;
  chooseCourse: (courseId: string) => void;
  chooseProgrammingExperience: (experience: boolean) => void;
  setUsername: (value: string) => void;
};

export type OnboardingPosition = {
  current: number;
  total: number;
};

export function useOnboardingFlow({
  stage,
  currentUser,
}: Args): UseOnboardingFlowReturn {
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

  const [selectedUsername, setSelectedUsername] = useState<string>(
    currentUser.displayName ?? ""
  );
  const [selectedCareer, setSelectedCareer] = useState<CareerType | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [hasProgrammingExperience, setHasProgrammingExperience] = useState<
    boolean | null
  >(null);

  const canAdvance = useCallback(() => {
    console.log("Stage: " + stage);
    if (stage == "name" && selectedUsername.length > 0) return true;
    if (stage == "career" && selectedCareer != null) return true;
    if (stage == "course" && selectedCourse != null) return true;
    return false;
  }, [selectedCareer, selectedCourse, selectedUsername]);

  const chooseCareer = useCallback((careerType: CareerType) => {
    setSelectedCareer(careerType);
  }, []);

  const chooseCourse = useCallback((courseId: string) => {
    setSelectedCourse(courseId);
  }, []);

  const chooseProgrammingExperience = useCallback((hasExperience: boolean) => {
    setHasProgrammingExperience(hasExperience);
  }, []);

  const setUsername = useCallback((value: string) => {
    setSelectedUsername(value);
  }, []);

  const position: OnboardingPosition = {
    current: idx,
    total: stepOrder.length,
  };

  const next = useCallback(() => {
    console.log("Clicked onboarding");
    if (submitOnboardingMutation.isPending) return;
    console.log("Mutation not pending");
    if (!canAdvance()) return;
    console.log("Can advance");
    if (!atLast) goto(stepOrder[idx + 1]);
    console.log("At last, submitting");
    if (atLast) {
      console.log("At last ch1");
      console.log("CH1");
      console.log("USERNAME" + JSON.stringify(selectedUsername));
      console.log("CAREER: " + JSON.stringify(selectedCareer));
      console.log("COURSE: " + JSON.stringify(selectedCourse));
      console.log("EXP: " + hasProgrammingExperience);
      if (
        selectedUsername.length > 0 &&
        selectedCareer != null &&
        selectedCourse != null &&
        hasProgrammingExperience != null
      ) {
        console.log("CH2");
        const submission: OnboardingSubmission = {
          chosenPath: selectedCareer,
          chosenCourse: selectedCourse,
          hasProgrammingExperience: hasProgrammingExperience,
          selectedUsername: selectedUsername,
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
    selectedUsername,
    hasProgrammingExperience,
    submitOnboardingMutation,
  ]);

  return {
    goto,
    position,
    next,
    prev,
    canAdvance,
    selectedUsername,
    selectedCareer,
    selectedCourse,
    hasProgrammingExperience,
    chooseCareer,
    chooseCourse,
    chooseProgrammingExperience,
    setUsername,
  };
}
