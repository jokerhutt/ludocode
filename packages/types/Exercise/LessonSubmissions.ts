import type { AnswerToken } from "@ludocode/types/Exercise/AnswerToken";

export type ExerciseAnswer =
  | { type: "SELECT"; pickedValue: string }
  | { type: "CLOZE"; valuesByBlank: string[] };

export type ExerciseAttemptRequest = {
  answer: ExerciseAnswer;
};

export type ExerciseSubmissionRequest = {
  exerciseId: string;
  version: number;
  attempts: ExerciseAttemptRequest[];
};

export type LessonSubmissionRequest = {
  submissionId: string;
  lessonId: string;
  courseId: string;
  exercises: ExerciseSubmissionRequest[];
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
