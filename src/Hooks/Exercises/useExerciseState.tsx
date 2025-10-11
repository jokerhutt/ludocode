import { useCallback, useState } from "react";
import { mockExercises, mockLessons } from "../../Types/mockData/mockExercises";
import type { LudoTutorial } from "../../Types/Exercise/LudoTutorial";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";
import { router } from "../../routes/router";

type Args = {
  exercisePosition: number;
  tutorialId: string;
}

export function useExerciseState({exercisePosition, tutorialId}: Args) {
  
  const lesson: LudoTutorial[] = mockLessons;
  const exercises: LudoExercise[] = mockExercises;

  const clearAnswers = (length: number) =>
    setUserResponses(Array(length).fill(""));

  const [userResponses, setUserResponses] = useState<string[]>(["", "", ""]);

  const currentExercise = exercises[exercisePosition];

  const goToNextExercise = useCallback(() => {
    if (exercisePosition < exercises.length) {
      const newPosition = exercisePosition + 1;
      const nextExercise = exercises[newPosition];

      const gapCount =
        (nextExercise.answerField ?? nextExercise.prompt).split("___").length -
        1;
      setUserResponses(Array(gapCount).fill(""));

      router.navigate({
        to: `/tutorial/$tutorialId/exercise/$position`,
        params: {tutorialId, position: String(newPosition)}
      })

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
