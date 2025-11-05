import { CareerChoiceStep } from "@/features/Onboarding/Steps/CareerChoiceStep";
import { CourseChoiceStep } from "@/features/Onboarding/Steps/CourseChoiceStep";

export type StageKey = "course" | "career";

export type StepProps = {
  next: () => void;
  prev: () => void;
  goto: (s: StageKey) => void;
};

export const steps = {
  course: CourseChoiceStep,
  career: CareerChoiceStep,
} as const satisfies Record<StageKey, React.ComponentType<StepProps>>;

export const stepOrder: StageKey[] = ["career", "course"];
