import { useCallback, useState } from "react";
import { mockExercises, mockLessons } from "../../Types/mockData/mockExercises";
import type { LudoTutorial } from "../../Types/Exercise/LudoTutorial";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import { router } from "../../routes/router";

type Args = {
  exercisePosition: number;
  lessonId: string;
};

export function useExerciseState({ exercisePosition, lessonId }: Args) {
  const lesson: LudoTutorial[] = mockLessons;
  const exercises: LudoExercise[] = mockExercises;

  const clearAnswers = (length: number) =>
    setUserResponses(Array(length).fill(""));

  const getGapCount = (exercise: LudoExercise) => {
    return (exercise.answerField ?? exercise.prompt).split("___").length - 1;
  };

  const currentExercise = exercises[exercisePosition];

  const [userResponses, setUserResponses] = useState<string[]>(
    Array(getGapCount(currentExercise)).fill("")
  );

  const goToNextExercise = useCallback(() => {
    if (exercisePosition < exercises.length) {
      const newPosition = exercisePosition + 1;
      const nextExercise = exercises[newPosition];

      const gapCount = getGapCount(nextExercise);
      setUserResponses(Array(gapCount).fill(""));

      router.navigate({
        to: "/course/$courseName/lesson/$lessonId",
        params: { courseName: "Python", lessonId: "1" },
        search: { exercise: newPosition },
      });
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
    currentExercise.options
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
