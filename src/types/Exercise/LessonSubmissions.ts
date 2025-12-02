import type { AnswerToken } from "@/hooks/Flows/Exercises/useExercise";

export type LessonSubmission = {
  id: string;
  lessonId: string;
  submissions: ExerciseSubmission[];
};

export type ExerciseSubmission = {
  exerciseId: string;
  attempts: ExerciseAttempt[];
  version: number;
};

export type ExerciseAttempt = {
  exerciseId: string;
  isCorrect: boolean;
  answer: AnswerToken[];
};
