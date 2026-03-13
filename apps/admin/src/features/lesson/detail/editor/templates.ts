import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftBlock,
  LanguageMetadata,
} from "@ludocode/types";
import { getDefaultMainFilename, resolveCourseLanguage } from "./language.ts";
import { uuidv4 } from "zod";

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
  courseLanguage?: LanguageMetadata,
): CurriculumDraftLessonExercise => {
  const languageMetadata = resolveCourseLanguage(courseLanguage);

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
      files: [
        {
          id: crypto.randomUUID(),
          name: getDefaultMainFilename(courseLanguage),
          language: languageMetadata,
          content: "",
        },
      ],
      tests: [{ type: "OUTPUT_EQUALS", expected: "" }],
    },
  };
};

type BlockType = CurriculumDraftBlock["type"];

export const createBlockTemplate = (
  type: BlockType,
  courseLanguage?: LanguageMetadata,
): CurriculumDraftBlock => {
  const languageMetadata = resolveCourseLanguage(courseLanguage);

  switch (type) {
    case "header":
      return { clientId: crypto.randomUUID(), type: "header", content: "" };
    case "paragraph":
      return { clientId: crypto.randomUUID(), type: "paragraph", content: "" };
    case "code":
      return {
        clientId: crypto.randomUUID(),
        type: "code",
        language: languageMetadata,
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
