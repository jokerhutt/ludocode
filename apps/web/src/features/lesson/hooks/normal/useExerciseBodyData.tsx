import type {
  LudoExercise,
  ExerciseInteraction as ExerciseInteractionType,
  InteractionFile,
} from "@ludocode/types/Exercise/LudoExercise.ts";
import type { useExerciseInputResponse } from "@/features/lesson/hooks/normal/useExerciseInput";
import { useMemo } from "react";
import type { ExerciseType } from "@ludocode/types/Exercise/ExerciseType.ts";

function stableId(content: string, index: number): string {
  let hash = 0;
  const str = `${content}::${index}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `opt-${Math.abs(hash).toString(36)}`;
}

export type DerivedOption = { id: string; content: string };

export function deriveExerciseType(exercise: LudoExercise): ExerciseType {
  return exercise.interaction?.type ?? "INFO";
}

function deriveOptions(
  interaction?: ExerciseInteractionType | null,
): DerivedOption[] {
  if (!interaction) return [];

  if (interaction.type === "SELECT") {
    return interaction.items.map((item, i) => ({
      id: stableId(item, i),
      content: item,
    }));
  }

  if (interaction.type === "CLOZE") {
    return interaction.options.map((option, i) => ({
      id: stableId(option, i),
      content: option,
    }));
  }

  return [];
}

function getInteractionFile(
  interaction?: ExerciseInteractionType | null,
): InteractionFile | null {
  if (interaction?.type === "CLOZE") return interaction.file;
  return null;
}

const shuffleOptions = <T,>(arr: T[]): T[] => {
  return arr
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

export function useExerciseBodyData(
  currentExercise: LudoExercise,
  inputState: useExerciseInputResponse,
) {
  const interactionFile = getInteractionFile(currentExercise.interaction);

  const rawOptions = useMemo(
    () => deriveOptions(currentExercise.interaction),
    [currentExercise.id],
  );

  const options = useMemo(() => shuffleOptions(rawOptions), [rawOptions]);

  const exerciseType = deriveExerciseType(currentExercise);

  const {
    currentExerciseInputs,
    clearExerciseInputs,
    popLastAnswer,
    isEmpty,
    replaceAnswerAt,
    setAnswerAt,
  } = inputState;

  return {
    interactionFile,
    options,
    popLastAnswer,
    exerciseType,
    isEmpty,
    currentExerciseInputs,
    clearExerciseInputs,
    replaceAnswerAt,
    setAnswerAt,
  };
}
