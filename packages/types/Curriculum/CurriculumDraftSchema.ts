import { z } from "zod";

export const curriculumDraftSchema = z.object({
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "Module title required"),
      lessons: z.array(
        z.object({
          id: z.string(),
          title: z.string().min(1, "Lesson title required"),
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

export const CodeBlockSchema = z.object({
  ...BaseClient,
  type: z.literal("code"),
  language: z.string().min(1, "Language required"),
  content: z.string().min(1, "Code content required"),
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
});

export const ExerciseInteractionSchema = z.discriminatedUnion("type", [
  SelectInteractionSchema,
  ClozeInteractionSchema,
]);

// ─── Exercise ──────────────────────────────────────────────────────────

export const CurriculumDraftExerciseSchema = z.object({
  exerciseId: z.string(),
  exerciseVersion: z.number().int().nonnegative(),
  blocks: z.array(BlockSchema),
  interaction: ExerciseInteractionSchema.nullable().optional(),
});

// ─── Lesson ────────────────────────────────────────────────────────────

export const CurriculumDraftLessonSchema = z.object({
  exercises: z.array(CurriculumDraftExerciseSchema),
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
