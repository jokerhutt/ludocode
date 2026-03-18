import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useCommittedSubmissions } from "@/features/lesson/hooks/useCommittedSubmissions.tsx";
import { useExerciseEvaluation } from "@/features/lesson/hooks/useExerciseEvaluation.tsx";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { useExerciseProgression } from "@/features/lesson/hooks/useExerciseProgression.tsx";

type Args = {
  courseId: string;
  exercises: LudoExercise[];
  lesson: LudoLesson;
  position: number;
  config: LessonConfig;
};

export type LessonConfig = {
  audioEnabled: boolean;
};

export type LessonExerciseValue = {
  lesson: LudoLesson;
  currentExercise: LudoExercise;
};

export type LessonEvaluationValue = {
  isComplete: boolean;
  isIncorrect: boolean;
  isOutputVisible: boolean;
  incorrectFeedbackMessage: string | null;
  dismissIncorrectFeedback: () => void;
};

export type LessonSubmissionValue = {
  submissionHistory: ExerciseSubmission[];
  submitAttempt: (
    attempt: ExerciseAttempt | null,
    feedbackMessage?: string | null,
  ) => void;
  continueToNextExercise: (submissions?: ExerciseSubmission[]) => void;
};

export function useLesson({
  exercises,
  lesson,
  courseId,
  position,
  config,
}: Args): useExerciseResponse {
  const index = Math.max(0, Math.min(position - 1, exercises.length - 1));
  const currentExercise = exercises[index];
  const lessonId = lesson.id;

  const { submissionHistory, commitSubmission, submitLesson } =
    useCommittedSubmissions({
      courseId,
      exercises,
      lessonId,
    });

  const { isComplete } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });

  const { continueToNextExercise } = useExerciseProgression({
    position,
    exerciseCount: exercises.length,
    submitLesson,
  });

  const evaluation = useExerciseEvaluation({
    currentExercise,
    isComplete,
    audioEnabled: config.audioEnabled,
    commitSubmission,
    continueToNextExercise,
  });

  return {
    exercise: {
      lesson,
      currentExercise,
    },
    evaluation: {
      isComplete: evaluation.isComplete,
      isIncorrect: evaluation.isIncorrect,
      isOutputVisible: evaluation.isOutputVisible,
      incorrectFeedbackMessage: evaluation.incorrectFeedbackMessage,
      dismissIncorrectFeedback: evaluation.dismissIncorrectFeedback,
    },
    submission: {
      submissionHistory,
      submitAttempt: evaluation.submitAttempt,
      continueToNextExercise,
    },
  };
}

export type useExerciseResponse = {
  exercise: LessonExerciseValue;
  evaluation: LessonEvaluationValue;
  submission: LessonSubmissionValue;
};
