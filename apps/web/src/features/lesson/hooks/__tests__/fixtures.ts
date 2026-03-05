import type { LudoExercise, LudoLesson } from "@ludocode/types";

export const c1Id = crypto.randomUUID();
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
    orderIndex: 1,
    version: 1,
    blocks: [{ type: "header", content: "How to write 2 + 2 in Python?" }],
    interaction: {
      type: "CLOZE",
      file: { language: "python", content: "2 ___ 2" },
      blanks: [{ index: 0, correctOptions: ["+"] }],
      options: ["+", "/"],
    },
  },
  {
    id: e2Id,
    orderIndex: 2,
    version: 1,
    blocks: [{ type: "header", content: "How to write 4 + 4 - 4 in Python?" }],
    interaction: {
      type: "CLOZE",
      file: { language: "python", content: "4 ___ 4 ___ 4" },
      blanks: [
        { index: 0, correctOptions: ["+"] },
        { index: 1, correctOptions: ["-"] },
      ],
      options: ["+", "-", "/"],
    },
  },
  {
    id: e3Id,
    orderIndex: 3,
    version: 1,
    blocks: [
      {
        type: "header",
        content:
          "Now you have learned all about arithmetic operators in python!",
      },
    ],
  },
];
