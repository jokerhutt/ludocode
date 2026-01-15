import type { StageKey } from "@ludocode/types";
import {
  CareerChoiceStep,
  CourseChoiceStep,
  HasExperienceStep,
  UsernameChoiceStep,
} from "./OnboardingStepComponents";


export const steps = {
  name: UsernameChoiceStep,
  course: CourseChoiceStep,
  career: CareerChoiceStep,
  experience: HasExperienceStep,
} as const satisfies Record<StageKey, React.ComponentType>;

export const stepOrder: StageKey[] = ["name", "career", "course", "experience"];
