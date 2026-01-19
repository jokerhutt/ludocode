import type { LudoExercise, LudoLesson } from "@ludocode/types";

const l1Id = crypto.randomUUID();
const e1Id = crypto.randomUUID();
const e2Id = crypto.randomUUID();
const e3Id = crypto.randomUUID();

export const l1: LudoLesson = {
  id: l1Id,
  title: "Adding numbers in Python",
  orderIndex: 1,
  isCompleted: false,
};

export const l1exercises: LudoExercise[] = [
  {
    id: e1Id,
    lessonId: l1Id,
    title: "How to write 2 + 2 in Python?",
    prompt: "2 ___ 2",
    exerciseType: "CLOZE",
    orderIndex: 1,
    version: 1,
    correctOptions: [
      {
        id: crypto.randomUUID(),
        content: "+",
        answerOrder: 1,
        exerciseVersion: 1,
      },
    ],
    distractors: [
      {
        id: crypto.randomUUID(),
        content: "/",
        answerOrder: null,
        exerciseVersion: 1,
      },
    ],
  },
  {
    id: e2Id,
    lessonId: l1Id,
    title: "How to write 4 + 4 - 4 in Python?",
    prompt: "4 ___ 4 ___ 4",
    exerciseType: "CLOZE",
    orderIndex: 2,
    version: 1,
    correctOptions: [
      {
        id: crypto.randomUUID(),
        content: "+",
        answerOrder: 1,
        exerciseVersion: 1,
      },
      {
        id: crypto.randomUUID(),
        content: "-",
        answerOrder: 2,
        exerciseVersion: 1,
      },
    ],
    distractors: [
      {
        id: crypto.randomUUID(),
        content: "/",
        answerOrder: null,
        exerciseVersion: 1,
      },
    ],
  },
  {
    id: e3Id,
    lessonId: l1Id,
    title: "Now you have learned all about arithmetic operators in python!",
    exerciseType: "INFO",
    orderIndex: 3,
    version: 1,
    correctOptions: [],
    distractors: [
      {
        id: crypto.randomUUID(),
        content: "/",
        answerOrder: null,
        exerciseVersion: 1,
      },
    ],
  },
];
