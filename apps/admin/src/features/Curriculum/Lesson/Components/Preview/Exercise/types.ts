import type { ExerciseType } from "@ludocode/types";

export type OptionLayout = "ROW" | "COLUMN";
export type SelectionMode = "APPEND" | "REPLACE";

export type ExerciseInteractionConfig = {
  optionLayout: OptionLayout;
  selectionMode: SelectionMode;
  withGaps: boolean;
};

export const configByType: Record<ExerciseType, ExerciseInteractionConfig> = {
  CLOZE: {
    optionLayout: "ROW",
    selectionMode: "APPEND",
    withGaps: true,
  },
  SELECT: {
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
  INFO: {
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
};
