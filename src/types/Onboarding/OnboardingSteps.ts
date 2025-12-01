import { CareerChoiceStep } from "@/features/Onboarding/Steps/CareerChoiceStep";
import { CourseChoiceStep } from "@/features/Onboarding/Steps/CourseChoiceStep";
import { HasExperienceStep } from "@/features/Onboarding/Steps/HasExperienceStep";

export type StageKey = "course" | "career" | "experience";

export const steps = {
  course: CourseChoiceStep,
  career: CareerChoiceStep,
  experience: HasExperienceStep,
} as const satisfies Record<StageKey, React.ComponentType>;

export const stepOrder: StageKey[] = ["career", "course", "experience"];
