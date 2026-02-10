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
export type CurriculumDraftModules = CurriculumDraft["modules"]
export type CurriculumDraftModule = CurriculumDraftModules[number]
export type CurriculumDraftLessons = CurriculumDraftModule["lessons"]
export type CurriculumDraftLesson = CurriculumDraftLessons[number]