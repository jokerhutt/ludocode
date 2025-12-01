import { z } from "zod";

export const HasProgrammingExperience = z.enum(["Yes", "No"]);

export const DesiredPathType = z.enum(["Data Science", "INTERMEDIATE"]);

export const OnboardingSnapSchema = z.object({
  chosenCourse: z.string(),
  hasProgrammingExperience: HasProgrammingExperience,
  desiredPath: DesiredPathType,
});