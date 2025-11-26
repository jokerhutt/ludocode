import type { ColumnType } from "@/Hooks/Logic/DnD/useOptionsDragAndDrop";
import type { ExerciseType } from "@/Types/Exercise/ExerciseType";
import type { LudoExerciseOption } from "@/Types/Exercise/LudoExerciseOption";
import type {
  ExerciseSnap,
  LessonSnap,
  ModuleSnap,
  OptionSnap,
} from "@/Types/Snapshot/SnapshotTypes";

export const newLesson = (orderIndex: number): LessonSnap => {
  return {
    id: crypto.randomUUID(),
    title: `Lesson ${orderIndex}`,
    orderIndex: orderIndex,
    exercises: [newExercises.INFO()],
  };
};

export const newModule = (orderIndex: number): ModuleSnap => {
  return {
    title: `Module ${orderIndex}`,
    moduleId: crypto.randomUUID(),
    isExpanded: false,
    lessons: [newLesson(1)],
  };
};

export const newOptionSnap = (
  columnType: ColumnType,
  itemsLength: number
): OptionSnap => {
  return {
    content: "Replace me",
    exerciseOptionId: crypto.randomUUID(),
    answerOrder: columnType === "correct" ? itemsLength + 1 : null,
  };
};

type ExerciseFactoryMap = {
  [K in ExerciseType]: () => Extract<ExerciseSnap, { exerciseType: K }>;
};

export const newExercises: ExerciseFactoryMap = {
  INFO: () => ({
    id: crypto.randomUUID(),
    exerciseType: "INFO",
    title: "This is an answerless exercise",
    subtitle: "It is just for info",
    media: null,
    prompt: null,
    correctOptions: [],
    distractors: [],
  }),

  ANALYZE: () => ({
    id: crypto.randomUUID(),
    exerciseType: "ANALYZE",
    title: "What does the following code print?",
    subtitle: "",
    media: null,
    prompt: "print(2 + 2)",
    correctOptions: [],
    distractors: [],
  }),

  CLOZE: () => ({
    id: crypto.randomUUID(),
    exerciseType: "CLOZE",
    title: "Fill in the blanks",
    subtitle: "",
    media: null,
    prompt: "print(___)",
    correctOptions: [],
    distractors: [],
  }),

  TRIVIA: () => ({
    id: crypto.randomUUID(),
    exerciseType: "TRIVIA",
    title: "What does the print statement do?",
    subtitle: "",
    media: null,
    prompt: "",
    correctOptions: [],
    distractors: [],
  }),
};
