import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useCommittedSubmissions } from "@/features/lesson/hooks/useCommittedSubmissions.tsx";
import {
  findLastCorrectAttempt,
  getProjectSnapshotFromAttempt,
  useExerciseHistory,
} from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";
import { playSound } from "@/sound/soundManager.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";

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

export function useExercise({
  exercises,
  lesson,
  courseId,
  position,
  config,
}: Args): useExerciseResponse {
  const index = Math.max(0, Math.min(position - 1, exercises.length - 1));
  const currentExercise = exercises[index];
  const currentExerciseId = currentExercise.id;
  const lessonId = lesson.id;
  const isLastExercise = position >= exercises.length;
  const isInfo = !currentExercise.interaction;
  const isExecutable = currentExercise.interaction?.type === "EXECUTABLE";

  const [isIncorrect, setIsIncorrect] = useState(false);
  const [canSubmitFromInteraction, setCanSubmitFromInteraction] =
    useState(false);
  const [workingSnapshotsByExerciseId, setWorkingSnapshotsByExerciseId] =
    useState<Record<string, ProjectSnapshot>>({});
  const attemptFactoryRef = useRef<(() => ExerciseAttempt | null) | null>(null);

  const { submissionHistory, commitSubmission, submitLesson } =
    useCommittedSubmissions({
      courseId,
      exercises,
      lessonId,
    });

  const { reviewSnapshot, isComplete } = useExerciseHistory({
    currentExercise,
    submissionHistory,
  });

  const workingSnapshot = useMemo(() => {
    return workingSnapshotsByExerciseId[currentExerciseId] ?? null;
  }, [workingSnapshotsByExerciseId, currentExerciseId]);

  const setWorkingSnapshot = useCallback(
    (snapshot: ProjectSnapshot) => {
      setWorkingSnapshotsByExerciseId((prev) => ({
        ...prev,
        [currentExerciseId]: {
          ...snapshot,
          files: snapshot.files.map((file) => ({ ...file })),
        },
      }));
    },
    [currentExerciseId],
  );

  const resetSnapshot = useMemo(() => {
    const previousExerciseId = exercises[index - 1]?.id;
    if (!previousExerciseId) return lesson.projectSnapshot ?? null;

    return (
      getProjectSnapshotFromAttempt(
        findLastCorrectAttempt(submissionHistory, previousExerciseId),
      ) ??
      lesson.projectSnapshot ??
      null
    );
  }, [exercises, index, submissionHistory, lesson.projectSnapshot]);

  useEffect(() => {
    setIsIncorrect(false);
    setCanSubmitFromInteraction(false);
    attemptFactoryRef.current = null;
  }, [currentExerciseId]);

  const dismissIncorrectFeedback = useCallback(() => {
    setIsIncorrect(false);
  }, []);

  const setCanSubmit = useCallback((value: boolean) => {
    setCanSubmitFromInteraction(value);
  }, []);

  const setAttemptFactory = useCallback(
    (factory: (() => ExerciseAttempt | null) | null) => {
      attemptFactoryRef.current = factory;
    },
    [],
  );

  const canSubmit =
    isComplete || isIncorrect || isInfo || canSubmitFromInteraction;

  const canGoBack = position > 1;

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    router.navigate(ludoNavigation.lesson.toPreviousExercise(position));
  }, [canGoBack, position]);

  const continueToNextStep = useCallback(() => {
    if (isLastExercise) {
      submitLesson();
      return;
    }

    router.navigate(ludoNavigation.lesson.toNextExercise(position));
  }, [isLastExercise, position, submitLesson]);

  const commitAttempt = useCallback(
    (attempt: ExerciseAttempt | null) => {
      if (attempt && config.audioEnabled) {
        playSound(attempt.isCorrect ? "correct" : "wrong");
      }

      const merged = commitSubmission(currentExercise, attempt);
      setIsIncorrect(Boolean(attempt && !attempt.isCorrect));
      return merged;
    },
    [commitSubmission, config.audioEnabled, currentExercise],
  );

  const handleExerciseButtonClick = useCallback(() => {
    if (isComplete) {
      continueToNextStep();
      return;
    }

    if (isIncorrect) {
      dismissIncorrectFeedback();
      return;
    }

    if (isExecutable) return;

    if (isInfo) {
      commitAttempt(null);
      return;
    }

    if (!canSubmitFromInteraction) return;

    const attempt = attemptFactoryRef.current?.();
    if (!attempt) return;

    commitAttempt(attempt);
  }, [
    isComplete,
    continueToNextStep,
    isIncorrect,
    dismissIncorrectFeedback,
    isExecutable,
    isInfo,
    canSubmitFromInteraction,
    commitAttempt,
  ]);

  const submitExecutableAttempt = useCallback(
    (attempt: ExerciseAttempt) => {
      if (!isExecutable) return;
      commitAttempt(attempt);
    },
    [isExecutable, commitAttempt],
  );

  return {
    lesson,
    currentExercise,
    submissionHistory,
    isComplete,
    isIncorrect,
    reviewSubmissionSnapshot: reviewSnapshot,
    workingSnapshot,
    setWorkingSnapshot,
    resetSnapshot,
    isExecutable,
    canSubmit,
    dismissIncorrectFeedback,
    setCanSubmit,
    setAttemptFactory,
    submitExecutableAttempt,
    handleExerciseButtonClick,
    canGoBack,
    goBack,
  };
}

export type useExerciseResponse = {
  lesson: LudoLesson;
  currentExercise: LudoExercise;
  submissionHistory: ExerciseSubmission[];
  isComplete: boolean;
  isIncorrect: boolean;
  reviewSubmissionSnapshot: ProjectSnapshot | null;
  workingSnapshot: ProjectSnapshot | null;
  setWorkingSnapshot: (snapshot: ProjectSnapshot) => void;
  resetSnapshot: ProjectSnapshot | null;
  isExecutable: boolean;
  canSubmit: boolean;
  dismissIncorrectFeedback: () => void;
  setCanSubmit: (canSubmit: boolean) => void;
  setAttemptFactory: (factory: (() => ExerciseAttempt | null) | null) => void;
  submitExecutableAttempt: (attempt: ExerciseAttempt) => void;
  handleExerciseButtonClick: () => void;
  canGoBack: boolean;
  goBack: () => void;
};
