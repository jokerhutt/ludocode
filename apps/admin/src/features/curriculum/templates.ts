import type {
  CurriculumDraftLesson,
  CurriculumDraftModule,
} from "@ludocode/types";

export const createNewModuleTemplate = (): CurriculumDraftModule => ({
  id: crypto.randomUUID(),
  title: "Untitled Module",
  lessons: [createNewLessonTemplate()],
});

export const createNewLessonTemplate = (): CurriculumDraftLesson => ({
  id: crypto.randomUUID(),
  title: "Untitled lesson",
  lessonType: "NORMAL",
});

export const createNewGuidedLessonTemplate = (): CurriculumDraftLesson => ({
  id: crypto.randomUUID(),
  title: "Untitled guided project",
  lessonType: "GUIDED",
});
