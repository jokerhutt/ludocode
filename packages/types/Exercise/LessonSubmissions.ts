import type { AnswerToken } from "../../../apps/web/src/features/Lesson/Hooks/useExercise.tsx";

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
