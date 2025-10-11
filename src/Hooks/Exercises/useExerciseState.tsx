import { useCallback, useState } from "react";
import { mockExercises, mockLessons } from "../../Types/mockData/mockExercises";
import type { LudoTutorial } from "../../Types/Exercise/LudoTutorial";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";

export function useExerciseState() {
  const lesson: LudoTutorial[] = mockLessons;
  const exercises: LudoExercise[] = mockExercises;

  const clearAnswers = (length: number) =>
    setUserResponses(Array(length).fill(""));

  const [userResponses, setUserResponses] = useState<string[]>(["", "", ""]);

  const [currentPosition, setCurrentPosition] = useState(0);
  const currentExercise = exercises[currentPosition];

  const goToNextExercise = useCallback(() => {
    if (currentPosition < exercises.length) {
      const newPosition = currentPosition + 1;
      const nextExercise = exercises[newPosition];

      const gapCount =
        (nextExercise.answerField ?? nextExercise.prompt).split("___").length -
        1;
      setUserResponses(Array(gapCount).fill(""));
      setCurrentPosition(newPosition);
    }
  }, [currentPosition, exercises, clearAnswers]);

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
    currentPosition,
    userResponses,
    setAnswerAt,
    addAnswer,
    canSubmit,
    goToNextExercise,
  };
}
