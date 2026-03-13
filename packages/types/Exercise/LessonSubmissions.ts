export type ExerciseAnswer =
  | { type: "SELECT"; pickedValue: string }
  | { type: "CLOZE"; valuesByBlank: string[] }
  | {
      type: "EXECUTABLE";
      files: { name: string; content: string }[];
    };

export type ExerciseSubmissionRequest = {
  exerciseId: string;
  version: number;
  attempts: ExerciseAnswer[];
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
  answer: AnswerToken[] | ExecutableAnswer;
};

export type AnswerToken = { id?: string; value: string };

export type ExecutableAnswer = {files: ExecutableFileSubmission[]}

export type ExecutableFileSubmission = {name: string; content: string;}
