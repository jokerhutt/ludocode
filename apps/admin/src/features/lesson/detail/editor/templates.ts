import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftBlock,
  LanguageMetadata,
} from "@ludocode/types";
import { getCourseLanguageSlug } from "./language.ts";

export const createNewExerciseTemplate = (): CurriculumDraftLessonExercise => ({
  exerciseId: crypto.randomUUID(),
  blocks: [
    {
      clientId: crypto.randomUUID(),
      type: "header",
      content: "Untitled Exercise",
    },
  ],
  interaction: null,
});

export const createNewGuidedExerciseTemplate = (
  _courseLanguage?: LanguageMetadata,
): CurriculumDraftLessonExercise => {
  return {
    exerciseId: crypto.randomUUID(),
    blocks: [
      {
        clientId: crypto.randomUUID(),
        type: "header",
        content: "Untitled Exercise",
      },
      {
        clientId: crypto.randomUUID(),
        type: "instructions",
        instructions: [""],
      },
    ],
    interaction: {
      type: "EXECUTABLE",
      solution: "",
      tests: [
        {
          type: "FILE_PATTERN_MATCHES",
          expected: "print\\(\\s*[\"']Hello World[\"']\\s*\\)",
        },
      ],
    },
  };
};

type BlockType = CurriculumDraftBlock["type"];

export const createBlockTemplate = (
  type: BlockType,
  courseLanguage?: LanguageMetadata,
): CurriculumDraftBlock => {
  switch (type) {
    case "header":
      return { clientId: crypto.randomUUID(), type: "header", content: "" };
    case "paragraph":
      return { clientId: crypto.randomUUID(), type: "paragraph", content: "" };
    case "code":
      return {
        clientId: crypto.randomUUID(),
        type: "code",
        language: getCourseLanguageSlug(courseLanguage),
        content: "",
      };
    case "media":
      return {
        clientId: crypto.randomUUID(),
        type: "media",
        src: "",
        alt: null,
      };
    case "instructions":
      return {
        clientId: crypto.randomUUID(),
        type: "instructions",
        instructions: [""],
      };
  }
};
