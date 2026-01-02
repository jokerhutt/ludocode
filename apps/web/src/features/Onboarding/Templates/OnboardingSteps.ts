import { CareerChoiceStep } from "./CareerChoiceStep";
import { CourseChoiceStep } from "./CourseChoiceStep";
import { HasExperienceStep } from "./HasExperienceStep";

export type StageKey = "course" | "career" | "experience";

export const steps = {
  course: CourseChoiceStep,
  career: CareerChoiceStep,
  experience: HasExperienceStep,
} as const satisfies Record<StageKey, React.ComponentType>;

export const stepOrder: StageKey[] = ["career", "course", "experience"];
