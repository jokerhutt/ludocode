import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftBlock,
} from "@ludocode/types";

export const createNewExerciseTemplate = (): CurriculumDraftLessonExercise => ({
  exerciseId: crypto.randomUUID(),
  exerciseVersion: 1,
  blocks: [{ type: "header", content: "Untitled Exercise" }],
  interaction: null,
});

type BlockType = CurriculumDraftBlock["type"];

export const createBlockTemplate = (type: BlockType): CurriculumDraftBlock => {
  switch (type) {
    case "header":
      return { type: "header", content: "" };
    case "paragraph":
      return { type: "paragraph", content: "" };
    case "code":
      return { type: "code", language: "python", content: "" };
    case "media":
      return { type: "media", src: "", alt: null };
  }
};
