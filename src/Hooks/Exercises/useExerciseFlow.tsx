import { useEffect, useState } from "react";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import type {
  ExerciseAttempt,
  ExerciseSubmission,
} from "../../Types/Exercise/LessonSubmissionTypes";
import { getGapCount } from "./useExerciseState";
import {
  areAllFilled,
  areAllValid,
  checkCorrect,
  findLastAttempt,
} from "./exerciseHelpers";
import { useAttemptBuffer } from "./useAttemptBuffer";
import { router } from "../../routes/router";
import { ludoNavigation } from "../../routes/ludoNavigation";

type Args = {
  exercises: LudoExercise[];
  lesson: LudoLesson;
  position: number;
};

export function useExerciseFlow({ exercises, lesson, position }: Args) {

  const [exerciseSubmissions, setExerciseSubmissions] = useState<
    ExerciseSubmission[]
  >([]);

  const [submissionBuffer, setSubmissionBuffer] = useState<ExerciseAttempt | null>(null)

  const currentExercise = exercises[position]; // derive, not state
  const gapCount = getGapCount(currentExercise);

  const { buffer, addAnswer, replaceAnswer, clear } = useAttemptBuffer({
    exerciseId: currentExercise.id,
    gapCount: gapCount,
    submissions: exerciseSubmissions,
  });

  const addAttempt = (attempt: ExerciseAttempt) => {
    const exerciseId = attempt.exerciseId
    setExerciseSubmissions((prev) => {
      const existing = prev.find((s) => s.exerciseId === exerciseId);

      if (!existing) {
        return [...prev, { exerciseId, attempts: [attempt] }];
      }

      return prev.map((s) =>
        s.exerciseId === exerciseId
          ? { ...s, attempts: [...s.attempts, attempt] }
          : s
      );
    });
  };

  const allSlotsFilled = areAllFilled(buffer);
  const allSlotsValid = allSlotsFilled && areAllValid(buffer, currentExercise);

  const submitAttemptBuffer = () => {
    if (!allSlotsValid) return;
    const isCorrect = checkCorrect(buffer, currentExercise);
    const attempt: ExerciseAttempt = {exerciseId: currentExercise.id, isCorrect: isCorrect, answer: buffer}
    setSubmissionBuffer(attempt)
  };

  const commitAttempt = () => {
    if (!submissionBuffer) return;
    addAttempt(submissionBuffer)
    if (submissionBuffer.isCorrect) {
        setSubmissionBuffer(null)
        router.navigate(ludoNavigation.nextExercise(lesson.id, position))
    } else {
        clear()
        setSubmissionBuffer(null)
    }
}


}
