import type {
  CurriculumDraftLessonExercise,
  CurriculumDraftBlock,
} from "@ludocode/types";

export const createNewExerciseTemplate = (): CurriculumDraftLessonExercise => ({
  exerciseId: crypto.randomUUID(),
  blocks: [{ clientId: crypto.randomUUID(), type: "header", content: "Untitled Exercise" }],
  interaction: null,
});

type BlockType = CurriculumDraftBlock["type"];

export const createBlockTemplate = (type: BlockType): CurriculumDraftBlock => {
  switch (type) {
    case "header":
      return { clientId: crypto.randomUUID(), type: "header", content: "" };
    case "paragraph":
      return {clientId: crypto.randomUUID(), type: "paragraph", content: "" };
    case "code":
      return {clientId: crypto.randomUUID(), type: "code", language: "python", content: "" };
    case "media":
      return {clientId: crypto.randomUUID(), type: "media", src: "", alt: null };
  }
};
