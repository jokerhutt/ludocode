import type { AnswerToken } from "@ludocode/types/Exercise/AnswerToken";

export type LessonSubmission = {
  submissionId: string;
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
