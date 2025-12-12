export type DevInfoContent = {
  title: string;
  description?: string;
  body: string;
  subText?: string;
};

export const exTypeInfoContent: DevInfoContent = {
  title: "Exercises: Lesson types",
  description:
    "When making exercises, you can select from one of four exercise types",
  body: `
**Info Exercises**:
These are just for info / explanation and do not have correct answers.

**Analyze Exercises**:
Provide a code snippet for the user to analyze and must have **exactly one** correct answer.

**Cloze Exercises**:
Fill-in-the-blank exercises using triple underscores \`___\`. Must have **exactly as many correct answers** as gaps.

**Trivia Exercises**:
Like Analyze, but without a code snippet. Focuses on conceptual understanding.
  `.trim(),
};
