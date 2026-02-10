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
  title: "Untitled Lesson",
})
