import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoExercise } from "@ludocode/types/Exercise/LudoExercise.ts";
import { useChangeExercise } from "@/features/Lesson/Hooks/useChangeExercise.tsx";

import { useCallback, useEffect, useState } from "react";
import type { ExerciseAttempt } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { useStagedAttempt } from "@/features/Lesson/Hooks/useStagedAttempt.tsx";
import {
  useExerciseInput,
  type useExerciseInputResponse,
} from "@/features/Lesson/Hooks/useExerciseInput.tsx";
import { useCommittedSubmissions } from "@/features/Lesson/Hooks/useCommittedSubmissions.tsx";
import type { ExercisePhase } from "@/features/Lesson/Components/Zone/LessonFooter.tsx";

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
  const index = position - 1;
  const currentExercise = exercises[index];
  const currentExerciseId = currentExercise.id;
  const lessonId = lesson.id;
  const isInfo = !currentExercise.interaction;
  const hasCodeOutput = currentExercise.blocks.some(
    (b) => b.type === "code" && b.output != null,
  );

  const [isInfoSubmitted, setIsInfoSubmitted] = useState(false);

  useEffect(() => {
    setIsInfoSubmitted(false);
  }, [currentExerciseId]);

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
    phase: stagedPhase,
    currentlyStagedAttempt,
    canSubmit,
    hasStaged,
  } = stagedAttempt;

  const phase: ExercisePhase = isInfo
    ? isInfoSubmitted
      ? "SUBMITTED"
      : "DEFAULT"
    : stagedPhase;

  const { commitStagedAttemptIntoSubmissions } = useCommittedSubmissions({
    courseId,
    currentExercise,
    position,
    exercises,
    clearExerciseInputs,
    clearStaged,
    lessonId,
  });

  useChangeExercise({ initializeInputs, currentExerciseId, submissions: [] });

  const handleExerciseButtonClick = useCallback(() => {
    if (!canSubmit) return;
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
  };
}

export type useExerciseResponse = {
  currentExercise: LudoExercise;
  canSubmit: boolean;
  phase: ExercisePhase;
  currentlyStagedAttempt: ExerciseAttempt | null;
  handleExerciseButtonClick: () => void;
  inputState: useExerciseInputResponse;
};
