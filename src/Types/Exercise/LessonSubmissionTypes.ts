export type LessonSubmission = {
  lessonId: string;
  submissions: ExerciseSubmission[];
};

export type ExerciseSubmission = {
  exerciseId: string;
  attempts: ExerciseAttempt[];
};

export type ExerciseAttempt = {
    exerciseId: string;
  isCorrect: boolean;
  answer: string[];
};
