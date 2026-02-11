import type { CurriculumDraftLessonExercise } from "@ludocode/types";

export const createNewExerciseTemplate = (): CurriculumDraftLessonExercise => ({
  id: crypto.randomUUID(),
  exerciseType: "INFO",
  title: "Untitled Exercise",
  subtitle: "",
  media: "",
  prompt: "",
  correctOptions: [],
  distractors: [],
});
