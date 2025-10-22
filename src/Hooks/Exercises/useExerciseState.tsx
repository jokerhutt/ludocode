import { useCallback, useState } from "react";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import { router } from "../../routes/router";
import { ludoNavigation } from "../../routes/ludoNavigation";
import type { LudoLesson } from "../../Types/Catalog/LudoLesson";

type Args = {
  exercisePosition: number;
  lessonId: string;
  courseId: string;
  exercises: LudoExercise[];
  lesson: LudoLesson[];
};

export const getGapCount = (exercise: LudoExercise) => {
  if (exercise.exerciseType != "CLOZE") {
    return 1;
  } else {
    return (exercise.prompt ?? exercise.title).split("___").length - 1;
  }
};

export function useExerciseState({
  exercisePosition,
  lessonId,
  courseId,
  exercises,
}: Args): useExerciseStateReturn {
  const clearAnswers = (length: number) =>
    setUserResponses(Array(length).fill(""));

  const exerciseIndex = exercisePosition - 1;

  const currentExercise = exercises[exerciseIndex];

  const [userResponses, setUserResponses] = useState<string[]>(
    Array(getGapCount(currentExercise)).fill("")
  );

  const goToNextExercise = useCallback(() => {
    if (exercisePosition < exercises.length) {
      const newPosition = exercisePosition + 1;
      const nextExercise = exercises[newPosition];

      const gapCount = getGapCount(nextExercise);
      setUserResponses(Array(gapCount).fill(""));

      router.navigate(ludoNavigation.lesson(courseId, lessonId, newPosition));
    }
  }, [exercisePosition, exercises, clearAnswers]);

  const setAnswerAt = useCallback((index: number, value: string) => {
    const trimmed = value.trim();
    setUserResponses((prev) => {
      const copy = [...prev];
      copy[index] = trimmed;
      return copy;
    });
  }, []);

  const addAnswer = useCallback((value: string) => {
    const trimmed = value.trim();
    setUserResponses((prev) => {
      const tempArray = [...prev];
      const firstSlot = tempArray.findIndex((slot) => slot === "");
      if (firstSlot === -1) return tempArray;
      tempArray[firstSlot] = trimmed;
      return tempArray;
    });
  }, []);

  const allFilled = userResponses.every((slot) => slot.trim() !== "");
  const allValid = userResponses.every((slot) =>
    currentExercise.exerciseOptions
      .map((option) => option.content)
      .includes(slot.trim())
  );
  const canSubmit = allFilled && allValid;

  return {
    currentExercise,
    exercises,
    userResponses,
    setAnswerAt,
    addAnswer,
    canSubmit,
    goToNextExercise,
  };
}

export type useExerciseStateReturn = {
  currentExercise: LudoExercise;
  exercises: LudoExercise[];
  userResponses: string[];
  setAnswerAt: (index: number, value: string) => void;
  addAnswer: (value: string) => void;
  canSubmit: boolean;
  goToNextExercise: () => void;
};
