import type {
  CurriculumDraftLesson,
  CurriculumDraftModule,
  LanguageKey,
} from "@ludocode/types";
import {
  getDefaultMainFilename,
  getLanguageSlug,
  resolveCourseLanguage,
} from "@/features/lesson/detail/editor/language.ts";

export const createNewModuleTemplate = (): CurriculumDraftModule => ({
  id: crypto.randomUUID(),
  title: "Untitled Module",
  lessons: [createNewLessonTemplate()],
});

export const createNewLessonTemplate = (): CurriculumDraftLesson => ({
  id: crypto.randomUUID(),
  title: "Untitled lesson",
  lessonType: "NORMAL",
  projectSnapshot: null,
});

export const createNewGuidedLessonTemplate = (
  courseLanguage?: LanguageKey,
): CurriculumDraftLesson => ({
  id: crypto.randomUUID(),
  title: "Untitled guided project",
  lessonType: "GUIDED",
  projectSnapshot: createDefaultGuidedProjectSnapshot(courseLanguage),
});

function createDefaultGuidedProjectSnapshot(courseLanguage?: LanguageKey) {
  const path = getDefaultMainFilename(courseLanguage);
  const language = getLanguageSlug(resolveCourseLanguage(courseLanguage));

  return {
    projectId: crypto.randomUUID(),
    projectName: "Guided Project",
    projectType: "CODE" as const,
    files: [
      {
        tempId: crypto.randomUUID(),
        path,
        language,
        content: "",
      },
    ],
    entryFilePath: path,
  };
}
