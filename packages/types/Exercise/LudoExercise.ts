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
  | { type: "code"; language: string; content: string; output?: string | null }
  | { type: "media"; src: string; alt?: string | null }
  | { type: "instructions"; instructions: string[] };

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
      output?: string | null;
    }
  | {
      type: "EXECUTABLE";
      solution: string;
      tests: ExecutableTest[];
      showOutput: boolean;
    };

export type InteractionBlank = {
  index: number;
  correctOptions: string[];
};

export type InteractionFile = {
  language: string;
  content: string;
};

export type ExecutableTestType =
  | "OUTPUT_CONTAINS"
  | "FILE_CONTAINS"
  | "OUTPUT_PATTERN_MATCHES"
  | "FILE_PATTERN_MATCHES";

export type ExecutableTest = {
  type: ExecutableTestType;
  feedback?: string;
  expected: string;
};
