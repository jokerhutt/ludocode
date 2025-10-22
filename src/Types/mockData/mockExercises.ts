import type { LudoModule } from "../Catalog/LudoModule";
import type { LudoExercise } from "../Exercise/LudoExercise";
import type { LudoExerciseOption } from "../Exercise/LudoExerciseOption";
import type { LudoLesson } from "../Exercise/LudoLesson";

export const mockLessons: LudoLesson[] = [
  {
    id: 1,
    unitId: 1,
    orderIndex: 1,
    title: "Variables",
    isPassed: false,
  },
];

export const mockModules: LudoModule[] = [
  {
    id: "1",
    courseId: "Python",
    orderIndex: 1,
    title: "Variables and Data Types",
  },
  {
    id: "2",
    courseId: "Python",
    orderIndex: 2,
    title: "Conditionals",
  },
  {
    id: "3",
    courseId: "Python",
    orderIndex: 3,
    title: "Loops",
  },
  {
    id: "4",
    courseId: "Python",
    orderIndex: 4,
    title: "Lists",
  },
  {
    id: "5",
    courseId: "Python",
    orderIndex: 5,
    title: "Functions",
  },
];

export const mockExercises: LudoExercise[] = [
  {
    id: 1,
    lessonId: 1,
    title: "Complete the expression",
    prompt: "let sum = ___ + 4",
    orderIndex: 1,
    type: "CLOZE",
    exerciseOptions: [
      {
        id: 2,
        exerciseId: 1,
        content: `"4"`,
      },
      {
        id: 3,
        exerciseId: 1,
        content: "4",
      },
    ],
  },
  {
    id: 2,
    lessonId: 1,
    title: `Create a variable with a value of "House"`,
    prompt: "const ___ = ___",
    orderIndex: 2,
    type: "CLOZE",
    exerciseOptions: [
      {
        id: 4,
        exerciseId: 2,
        content: `house`,
      },
      {
        id: 5,
        exerciseId: 2,
        content: `"House"`,
      },
      {
        id: 5,
        exerciseId: 2,
        content: `let`,
      },
    ],
  },
  {
    id: 3,
    lessonId: 1,
    title: "Fill in the gaps to print the message",
    prompt: `console.log("Hello World!") ___`,
    orderIndex: 1,
    type: "CLOZE",
    exerciseOptions: [
      {
        id: 6,
        exerciseId: 3,
        content: ")",
      },
      {
        id: 7,
        exerciseId: 3,
        content: "(",
      },
      {
        id: 8,
        exerciseId: 3,
        content: "log",
      },
      {
        id: 9,
        exerciseId: 3,
        content: ";",
      },
    ],
  },
  {
    id: 4,
    lessonId: 1,
    title: "What will the following code return",
    prompt: `const score = 4 + 4;`,
    orderIndex: 1,
    type: "ANALYZE",
    exerciseOptions: [
      {
        id: 10,
        exerciseId: 4,
        content: "8",
      },
      {
        id: 11,
        exerciseId: 4,
        content: "'8'",
      },
      {
        id: 12,
        exerciseId: 4,
        content: "undefined",
      },
      {
        id: 13,
        exerciseId: 4,
        content: "NaN",
      },
    ],
  },
  {
    id: 5,
    lessonId: 1,
    title:
      "Which of the following declares a variable that can not be reassigned",
    prompt: ``,
    orderIndex: 1,
    type: "TRIVIA",
    exerciseOptions: [
      {
        id: 14,
        exerciseId: 5,
        content: "let",
      },
      {
        id: 15,
        exerciseId: 5,
        content: "const",
      },
      {
        id: 16,
        exerciseId: 5,
        content: "var",
      },
      {
        id: 17,
        exerciseId: 5,
        content: "if",
      },
    ],
  },
];
