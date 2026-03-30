import { z } from "zod";

const LANGUAGE_KEYS = ["javascript", "python", "html", "css", "lua"] as const;

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
  language: z.enum(LANGUAGE_KEYS),
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
  language: z.enum(LANGUAGE_KEYS),
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
  id: z.string(),
  name: z.string().min(1, "A name is required for the file"),
  language: z.enum(LANGUAGE_KEYS),
  content: z.string(),
});

export const ExecutableTestSchema = z.object({
  type: z.enum([
    "OUTPUT_PATTERN_MATCHES",
    "OUTPUT_CONTAINS",
    "FILE_CONTAINS",
    "FILE_PATTERN_MATCHES",
  ]),
  feedback: z.string().optional().nullable(),
  expected: z.string(),
});

export const ExecutableInteractionSchema = z.object({
  type: z.literal("EXECUTABLE"),
  clientId: z.string().uuid().optional(),
  solution: z.string().min(1, "A sample solution is needed for this exercise"),
  tests: z.array(ExecutableTestSchema).min(1),
  showOutput: z.boolean().optional(),
});

export const ProjectFileSnapshotSchema = z.object({
  tempId: z.string().optional(),
  path: z.string().min(1),
  language: z.enum(LANGUAGE_KEYS),
  content: z.string(),
});

export const ProjectSnapshotSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  projectType: z.enum(["WEB", "CODE"]),
  deleteAt: z.string().optional().nullable(),
  updatedAt: z.number().optional(),
  files: z.array(ProjectFileSnapshotSchema).min(1),
  entryFilePath: z.string(),
});

const CurriculumDraftNavigatorLessonSchema = z
  .object({
    id: z.string(),
    title: z.string().min(1, "lesson title required"),
    lessonType: z.enum(["NORMAL", "GUIDED"]),
    projectSnapshot: ProjectSnapshotSchema.nullable(),
  })
  .superRefine((lesson, ctx) => {
    if (lesson.lessonType === "GUIDED" && !lesson.projectSnapshot) {
      ctx.addIssue({
        code: "custom",
        message: "GUIDED lessons require a projectSnapshot",
        path: ["projectSnapshot"],
      });
    }

    if (lesson.lessonType === "NORMAL" && lesson.projectSnapshot) {
      ctx.addIssue({
        code: "custom",
        message: "projectSnapshot is only allowed in GUIDED lessons",
        path: ["projectSnapshot"],
      });
    }

    if (
      lesson.lessonType === "GUIDED" &&
      lesson.projectSnapshot &&
      lesson.projectSnapshot.files.length !== 1
    ) {
      ctx.addIssue({
        code: "custom",
        message: "GUIDED lessons require exactly one project file",
        path: ["projectSnapshot", "files"],
      });
    }
  });

export const curriculumDraftSchema = z.object({
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(1, "Module title required"),
      lessons: z.array(CurriculumDraftNavigatorLessonSchema),
    }),
  ),
});

export type CurriculumDraft = z.infer<typeof curriculumDraftSchema>;
export type CurriculumDraftModules = CurriculumDraft["modules"];
export type CurriculumDraftModule = CurriculumDraftModules[number];
export type CurriculumDraftLessons = CurriculumDraftModule["lessons"];
export type CurriculumDraftLesson = CurriculumDraftLessons[number];

export const ExerciseInteractionSchema = z.discriminatedUnion("type", [
  SelectInteractionSchema,
  ClozeInteractionSchema,
  ExecutableInteractionSchema,
]);

// ─── Exercise ──────────────────────────────────────────────────────────

export const CurriculumDraftExerciseSchema = z.object({
  exerciseId: z.string(),
  blocks: z.array(BlockSchema),
  body: z.string().nullable().optional(),
  interaction: ExerciseInteractionSchema.nullable().optional(),
});

// ─── lesson ────────────────────────────────────────────────────────────

export const CurriculumDraftLessonSchema = z
  .object({
    lessonType: z.enum(["NORMAL", "GUIDED"]),
    projectSnapshot: ProjectSnapshotSchema.nullable().optional(),
    exercises: z.array(CurriculumDraftExerciseSchema),
  })
  .superRefine((lesson, ctx) => {
    if (lesson.lessonType === "GUIDED" && !lesson.projectSnapshot) {
      ctx.addIssue({
        code: "custom",
        message: "GUIDED lessons require a projectSnapshot",
        path: ["projectSnapshot"],
      });
    }

    if (lesson.lessonType === "NORMAL" && lesson.projectSnapshot) {
      ctx.addIssue({
        code: "custom",
        message: "projectSnapshot is only allowed in GUIDED lessons",
        path: ["projectSnapshot"],
      });
    }

    if (
      lesson.lessonType === "GUIDED" &&
      lesson.projectSnapshot &&
      lesson.projectSnapshot.files.length !== 1
    ) {
      ctx.addIssue({
        code: "custom",
        message: "GUIDED lessons require exactly one project file",
        path: ["projectSnapshot", "files"],
      });
    }

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

      if (lesson.lessonType === "GUIDED") {
        const instructionsBlock = ex.blocks[0];

        if (
          ex.blocks.length !== 1 ||
          instructionsBlock?.type !== "instructions"
        ) {
          ctx.addIssue({
            code: "custom",
            message:
              "GUIDED lessons require exactly one instructions block in every exercise",
            path: ["exercises", i, "blocks"],
          });
        }

        if (
          instructionsBlock?.type === "instructions" &&
          instructionsBlock.instructions.length < 1
        ) {
          ctx.addIssue({
            code: "custom",
            message:
              "GUIDED lessons require at least one instruction in every exercise",
            path: ["exercises", i, "blocks", 0, "instructions"],
          });
        }
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
