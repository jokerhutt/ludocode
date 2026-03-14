import type { ProjectSnapshot } from "../Project/ProjectSnapshot";

export type ExerciseAnswer =
  | { type: "SELECT"; pickedValue: string }
  | { type: "CLOZE"; valuesByBlank: string[] }
  | {
      type: "EXECUTABLE";
      submission: ProjectSnapshot;
    };

export type ExerciseSubmissionRequest = {
  exerciseId: string;
  version: number;
  results: ExerciseAttemptResult[]
};

export type ExerciseAttemptResult = {
  isCorrect: boolean;
  attempt: ExerciseAnswer
}

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
  answer: AnswerToken[] | { submission: ProjectSnapshot };
};

export type AnswerToken = { id?: string; value: string };
