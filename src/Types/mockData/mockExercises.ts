import type { LudoExercise } from "../Exercise/LudoExercise";
import type { LudoExerciseOption } from "../Exercise/LudoExerciseOption";
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
    answerField: `console. ___ ___ "Hello World!" ___ ___`,
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
];
