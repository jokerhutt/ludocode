import type {
  CurriculumDraftLessonExercise,
  ExerciseType,
} from "@ludocode/types";

export const createNewExerciseTemplate = (
  exerciseType: ExerciseType = "INFO",
): CurriculumDraftLessonExercise => ({
  id: crypto.randomUUID(),
  exerciseType,
  title: "Untitled Exercise",
  subtitle: "",
  media: "",
  prompt: "",
  correctOptions:
    exerciseType === "TRIVIA"
      ? [
          {
            content: "",
            answerOrder: 1,
            exerciseOptionId: crypto.randomUUID(),
          },
        ]
      : [],
  distractors: [],
});
