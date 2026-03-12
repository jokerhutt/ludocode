import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useChangeExercise } from "@/features/lesson/hooks/useChangeExercise.tsx";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ExerciseAttempt } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useStagedAttempt } from "@/features/lesson/hooks/useStagedAttempt.tsx";
import {
  useExerciseInput,
  type useExerciseInputResponse,
} from "@/features/lesson/hooks/useExerciseInput.tsx";
import { useCommittedSubmissions } from "@/features/lesson/hooks/useCommittedSubmissions.tsx";
import type { ExercisePhase } from "@/features/lesson/zones/LessonFooter.tsx";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { router } from "@/main";

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
  const hasCodeOutput = currentExercise.blocks.some(
    (b) => b.type === "code" && b.output != null,
  );

  const [isInfoSubmitted, setIsInfoSubmitted] = useState(false);

  const exerciseInput = useExerciseInput({ currentExercise });
  const { currentExerciseInputs, clearExerciseInputs, initializeInputs } =
    exerciseInput;

  const stagedAttempt = useStagedAttempt({
    currentExerciseInputs,
    currentExercise,
    playAudio: config.audioEnabled,
  });
  const {
    stageAttempt,
    clearStaged,
    restoreStaged,
    phase: stagedPhase,
    currentlyStagedAttempt,
    canSubmit,
    hasStaged,
  } = stagedAttempt;

  const { commitStagedAttemptIntoSubmissions, committedExerciseSubmissions } =
    useCommittedSubmissions({
      courseId,
      currentExercise,
      position,
      exercises,
      clearExerciseInputs,
      clearStaged,
      lessonId,
    });

  const isReviewing = useMemo(() => {
    return committedExerciseSubmissions.some(
      (s) =>
        s.exerciseId === currentExerciseId &&
        s.attempts.some((a) => a.isCorrect),
    );
  }, [committedExerciseSubmissions, currentExerciseId]);

  // Manage isInfoSubmitted state on exercise change
  useEffect(() => {
    if (isInfo && isReviewing) {
      setIsInfoSubmitted(true);
    } else {
      setIsInfoSubmitted(false);
    }
  }, [currentExerciseId, isReviewing, isInfo]);

  const phase: ExercisePhase = isInfo
    ? isInfoSubmitted
      ? "SUBMITTED"
      : "DEFAULT"
    : stagedPhase;

  useChangeExercise({
    initializeInputs,
    clearStaged,
    restoreStaged,
    currentExerciseId,
    submissions: committedExerciseSubmissions,
  });

  const canGoBack = position > 1;

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    router.navigate(ludoNavigation.lesson.toPreviousExercise(position));
  }, [canGoBack, position]);

  const handleExerciseButtonClick = useCallback(() => {
    if (!canSubmit) return;

    // When reviewing a completed exercise, just navigate forward
    if (isReviewing) {
      if (!isLastExercise) {
        router.navigate(ludoNavigation.lesson.toNextExercise(position));
      }
      return;
    }

    if (isInfo) {
      if (hasCodeOutput && !isInfoSubmitted) {
        setIsInfoSubmitted(true);
      } else {
        commitStagedAttemptIntoSubmissions(null);
      }
    } else if (hasStaged) {
      commitStagedAttemptIntoSubmissions(currentlyStagedAttempt);
    } else {
      stageAttempt();
    }
  }, [
    canSubmit,
    isReviewing,
    isLastExercise,
    position,
    isInfo,
    hasCodeOutput,
    isInfoSubmitted,
    hasStaged,
    currentlyStagedAttempt,
    commitStagedAttemptIntoSubmissions,
    stageAttempt,
  ]);

  return {
    phase,
    canSubmit,
    currentExercise,
    currentlyStagedAttempt,
    handleExerciseButtonClick,
    inputState: exerciseInput,
    canGoBack,
    goBack,
  };
}

export type useExerciseResponse = {
  currentExercise: LudoExercise;
  canSubmit: boolean;
  phase: ExercisePhase;
  currentlyStagedAttempt: ExerciseAttempt | null;
  handleExerciseButtonClick: () => void;
  inputState: useExerciseInputResponse;
  canGoBack: boolean;
  goBack: () => void;
};
