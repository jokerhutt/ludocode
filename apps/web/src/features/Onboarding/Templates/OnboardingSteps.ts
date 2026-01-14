import { CareerChoiceStep } from "./CareerChoiceStep";
import { CourseChoiceStep } from "./CourseChoiceStep";
import { HasExperienceStep } from "./HasExperienceStep";
import { UsernameChoiceStep } from "./UsernameChoiceStep";

export type StageKey = "name" | "course" | "career" | "experience";

export const steps = {
  name: UsernameChoiceStep,
  course: CourseChoiceStep,
  career: CareerChoiceStep,
  experience: HasExperienceStep,
} as const satisfies Record<StageKey, React.ComponentType>;

export const stepOrder: StageKey[] = ["name", "career", "course", "experience"];
