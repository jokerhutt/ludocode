import type { LudoExercise } from "../Exercise/LudoExercise";
import type { LudoExerciseOption } from "../Exercise/LudoExerciseOption";
import type { LudoModule } from "../Exercise/LudoModule";
import type { LudoTutorial } from "../Exercise/LudoTutorial";

export const mockLessons: LudoTutorial[] = [
  {
    id: 1,
    unitId: 1,
    orderIndex: 1,
    title: "Variables",
    isPassed: false,
  },
];

export const mockModules : LudoModule[] = [
  {
    id: 1,
    course: "Python",
    orderIndex: 1,
    title: "Variables and Data Types"
  },
    {
    id: 2,
    course: "Python",
    orderIndex: 2,
    title: "Conditionals"
  },
    {
    id: 3,
    course: "Python",
    orderIndex: 3,
    title: "Loops"
  },
    {
    id: 4,
    course: "Python",
    orderIndex: 4,
    title: "Lists"
  },
    {
    id: 5,
    course: "Python",
    orderIndex: 5,
    title: "Functions"
  },


]

export const mockExercises: LudoExercise[] = [
  {
    id: 1,
    tutorialId: 1,
    prompt: "Complete the expression",
    answerField: "let sum = ___ + 4",
    orderIndex: 1,
    type: "CLOZE",
    options: [
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
    tutorialId: 1,
    prompt: `Create a variable with a value of "House"`,
    answerField: "const ___ = ___",
    orderIndex: 2,
    type: "CLOZE",
    options: [
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
    tutorialId: 1,
    prompt: "Fill in the gaps to print the message",
    answerField: `console.log("Hello World!") ___`,
    orderIndex: 1,
    type: "CLOZE",
    options: [
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
    tutorialId: 1,
    prompt: "What will the following code return",
    answerField: `const score = 4 + 4;`,
    orderIndex: 1,
    type: "ANALYZE",
    options: [
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
    tutorialId: 1,
    prompt:
      "Which of the following declares a variable that can not be reassigned",
    answerField: ``,
    orderIndex: 1,
    type: "TRIVIA",
    options: [
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
