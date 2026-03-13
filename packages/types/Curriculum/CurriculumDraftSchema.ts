import { z } from "zod";

export const curriculumDraftSchema = z.object({
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "Module title required"),
      lessons: z.array(
        z.object({
          id: z.string(),
          title: z.string().min(1, "lesson title required"),
          lessonType: z.enum(["NORMAL", "GUIDED"]),
        }),
      ),
    }),
  ),
});

export type CurriculumDraft = z.infer<typeof curriculumDraftSchema>;
export type CurriculumDraftModules = CurriculumDraft["modules"];
export type CurriculumDraftModule = CurriculumDraftModules[number];
export type CurriculumDraftLessons = CurriculumDraftModule["lessons"];
export type CurriculumDraftLesson = CurriculumDraftLessons[number];

// ─── Blocks ────────────────────────────────────────────────────────────

const BaseClient = {
  clientId: z.string().uuid(),
};

export const HeaderBlockSchema = z.object({
  ...BaseClient,
  type: z.literal("header"),
  content: z.string().min(1, "Header content required"),
});

export const ParagraphBlockSchema = z.object({
  ...BaseClient,
  type: z.literal("paragraph"),
  content: z.string().min(1, "Paragraph content required"),
});

export const InstructionsBlockSchema = z.object({
  ...BaseClient,
  type: z.literal("instructions"),
  instructions: z.array(z.string().min(1)).min(1),
});

export const CodeBlockSchema = z.object({
  ...BaseClient,
  type: z.literal("code"),
  language: z.string().min(1, "language required"),
  content: z.string().min(1, "Code content required"),
  output: z.string().nullish(),
});

export const MediaBlockSchema = z.object({
  ...BaseClient,
  type: z.literal("media"),
  src: z.string().min(1, "Media source required"),
  alt: z.string().nullable().optional(),
});

export const BlockSchema = z.discriminatedUnion("type", [
  HeaderBlockSchema,
  ParagraphBlockSchema,
  CodeBlockSchema,
  MediaBlockSchema,
  InstructionsBlockSchema,
]);

// ─── Interaction ───────────────────────────────────────────────────────

export const InteractionBlankSchema = z.object({
  index: z.number().int().nonnegative(),
  correctOptions: z.array(z.string().min(1)).min(1),
});

export const InteractionFileSchema = z.object({
  language: z.string().min(1),
  content: z.string().min(1),
});

export const SelectInteractionSchema = z.object({
  type: z.literal("SELECT"),
  items: z.array(z.string().min(1)).min(2, "At least 2 items required"),
  correctValue: z.string().min(1, "Correct value required"),
});

export const ClozeInteractionSchema = z.object({
  type: z.literal("CLOZE"),
  file: InteractionFileSchema,
  blanks: z.array(InteractionBlankSchema).min(1, "At least 1 blank required"),
  options: z.array(z.string().min(1)).min(1, "At least 1 option required"),
  output: z.string().nullish(),
});

export const ExecutableFileSchema = z.object({
  name: z.string().min(1),
  language: z.string().min(1),
  content: z.string(),
});

export const ExecutableTestSchema = z.object({
  type: z.enum(["OUTPUT_EQUALS", "OUTPUT_CONTAINS", "FILE_CONTAINS"]),
  expected: z.string(),
});

export const ExecutableInteractionSchema = z.object({
  type: z.literal("EXECUTABLE"),
  clientId: z.string().uuid().optional(),
  files: z.array(ExecutableFileSchema).min(1),
  tests: z.array(ExecutableTestSchema).min(1),
  showOutput: z.boolean().optional(),
});

export const ExerciseInteractionSchema = z.discriminatedUnion("type", [
  SelectInteractionSchema,
  ClozeInteractionSchema,
  ExecutableInteractionSchema,
]);

// ─── Exercise ──────────────────────────────────────────────────────────

export const CurriculumDraftExerciseSchema = z.object({
  exerciseId: z.string(),
  blocks: z.array(BlockSchema),
  interaction: ExerciseInteractionSchema.nullable().optional(),
});

// ─── lesson ────────────────────────────────────────────────────────────

export const CurriculumDraftLessonSchema = z
  .object({
    lessonType: z.enum(["NORMAL", "GUIDED"]),
    exercises: z.array(CurriculumDraftExerciseSchema),
  })
  .superRefine((lesson, ctx) => {
    lesson.exercises.forEach((ex, i) => {
      const interactionType = ex.interaction?.type;

      if (lesson.lessonType === "GUIDED" && interactionType !== "EXECUTABLE") {
        ctx.addIssue({
          code: "custom",
          message:
            "GUIDED lessons require EXECUTABLE interaction in every exercise",
          path: ["exercises", i, "interaction"],
        });
      }

      if (lesson.lessonType === "NORMAL" && interactionType === "EXECUTABLE") {
        ctx.addIssue({
          code: "custom",
          message: "EXECUTABLE interaction is only allowed in GUIDED lessons",
          path: ["exercises", i, "interaction"],
        });
      }
    });
  });

export type CurriculumDraftLessonForm = z.infer<
  typeof CurriculumDraftLessonSchema
>;

export type CurriculumDraftLessonExercises =
  CurriculumDraftLessonForm["exercises"];

export type CurriculumDraftLessonExercise =
  CurriculumDraftLessonExercises[number];

export type CurriculumDraftBlock = z.infer<typeof BlockSchema>;
export type CurriculumDraftInteraction = z.infer<
  typeof ExerciseInteractionSchema
>;
