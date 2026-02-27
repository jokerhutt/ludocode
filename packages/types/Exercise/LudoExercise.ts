import type { ExerciseType } from "./ExerciseType";
import type { LudoExerciseOption } from "./LudoExerciseOption";

export type LudoExercise = {
  id: string;
  version: number;
  orderIndex: number;
  blocks: Block[];
  interaction?: ExerciseInteraction | null;
};

export type Block =
  | { type: "header"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "code"; language: string; content: string }
  | { type: "media"; src: string; alt?: string | null };

  export type ExerciseInteraction =
  | {
      type: "SELECT";
      items: string[];
      correctValue: string;
    }
  | {
      type: "CLOZE";
      file: InteractionFile;
      blanks: InteractionBlank[];
      options: string[];
    };

export type InteractionBlank = {
  index: number;
  correctOptions: string[];
};

export type InteractionFile = {
  language: string;
  content: string;
};

