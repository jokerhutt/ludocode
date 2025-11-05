import type { CareerType } from "@/Types/Onboarding/OnboardingCourse";
import { stepOrder, type StageKey } from "@/Types/Onboarding/OnboardingSteps";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

type Args = { stage: StageKey };

export type UseOnboardingFlowReturn = {
  goto: (s: StageKey) => void;
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

export function useOnboardingFlow({ stage }: Args): UseOnboardingFlowReturn {
  const nav = useNavigate();

  const idx = stepOrder.indexOf(stage);
  const atFirst = idx <= 0;
  const atLast = idx >= stepOrder.length - 1;

  const goto = useCallback(
    (s: StageKey) => nav({ to: "/onboarding/$stage", params: { stage: s } }),
    [nav]
  );

  const next = useCallback(() => {
    if (!canAdvance) return;
    if (!atLast) goto(stepOrder[idx + 1]);
  }, [atLast, goto, idx]);

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

  return {
    goto,
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
