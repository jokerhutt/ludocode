import type { ExerciseType } from "@ludocode/types";

export type OptionLayout = "ROW" | "COLUMN";
export type SelectionMode = "APPEND" | "REPLACE";

export type ExerciseInteractionConfig = {
  showAnswerField: boolean;
  optionLayout: OptionLayout;
  selectionMode: SelectionMode;
  withGaps: boolean;
};

export const configByType: Record<ExerciseType, ExerciseInteractionConfig> = {
  CLOZE: {
    showAnswerField: true,
    optionLayout: "ROW",
    selectionMode: "APPEND",
    withGaps: true,
  },
  TRIVIA: {
    showAnswerField: false,
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
  ANALYZE: {
    showAnswerField: true,
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
  INFO: {
    showAnswerField: false,
    optionLayout: "COLUMN",
    selectionMode: "REPLACE",
    withGaps: false,
  },
};
