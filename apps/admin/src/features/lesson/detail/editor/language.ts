import type {
  CurriculumDraftBlock,
  CurriculumDraftInteraction,
  CurriculumDraftLessonForm,
  LanguageKey,
} from "@ludocode/types";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot";

const FALLBACK_LANGUAGE: LanguageKey = "python";

export function getLanguageSlug(language?: LanguageKey): LanguageKey {
  return language ?? FALLBACK_LANGUAGE;
}

export function getLanguageDisplayName(language?: LanguageKey): string {
  if (!language) {
    const metadata = Languages[FALLBACK_LANGUAGE];
    return metadata?.name ?? FALLBACK_LANGUAGE;
  }
  const metadata = Languages[language];
  return metadata?.name ?? language;
}

export function resolveCourseLanguage(
  courseLanguage?: LanguageKey,
): LanguageKey {
  return courseLanguage ?? FALLBACK_LANGUAGE;
}

export function getCourseLanguageSlug(
  courseLanguage?: LanguageKey,
): LanguageKey {
  return getLanguageSlug(courseLanguage);
}

export function getCourseLanguageExtension(
  courseLanguage?: LanguageKey,
): string {
  const language = resolveCourseLanguage(courseLanguage);
  const metadata = Languages[language];
  const extension = metadata?.extension?.trim().replace(/^\./, "") ?? "";
  return extension.length > 0 ? extension : "py";
}

export function getDefaultMainFilename(courseLanguage?: LanguageKey): string {
  return `main.${getCourseLanguageExtension(courseLanguage)}`;
}

export function applyCourseLanguageToLessonDraft(
  draft: CurriculumDraftLessonForm,
  courseLanguage?: LanguageKey,
): CurriculumDraftLessonForm {
  const languageSlug = resolveCourseLanguage(courseLanguage);

  const normalizedSnapshot = draft.projectSnapshot
    ? normalizeProjectSnapshotForLessonType(
        draft.projectSnapshot,
        draft.lessonType,
        languageSlug,
      )
    : draft.projectSnapshot;

  return {
    ...draft,
    projectSnapshot: normalizedSnapshot,
    exercises: draft.exercises.map((exercise) => ({
      ...exercise,
      blocks: exercise.blocks.map((block) =>
        applyLanguageToBlock(block, languageSlug),
      ),
      interaction: applyLanguageToInteraction(
        exercise.interaction,
        languageSlug,
      ),
    })),
  };
}

function normalizeProjectSnapshotForLessonType(
  projectSnapshot: NonNullable<CurriculumDraftLessonForm["projectSnapshot"]>,
  lessonType: CurriculumDraftLessonForm["lessonType"],
  languageSlug: LanguageKey,
): NonNullable<CurriculumDraftLessonForm["projectSnapshot"]> {
  const normalizedFiles = projectSnapshot.files.map((file) => ({
    ...file,
    language: languageSlug,
  }));

  if (lessonType !== "GUIDED") {
    return {
      ...projectSnapshot,
      projectLanguage: languageSlug,
      projectType: projectSnapshot.projectType ?? "CODE",
      files: normalizedFiles,
    };
  }

  const guidedFiles = normalizedFiles.slice(0, 1);
  const firstFile = guidedFiles[0];

  return {
    ...projectSnapshot,
    projectLanguage: languageSlug,
    projectType: "CODE",
    files: guidedFiles,
    entryFilePath: firstFile?.path ?? projectSnapshot.entryFilePath,
  };
}

function applyLanguageToBlock(
  block: CurriculumDraftBlock,
  languageSlug: LanguageKey,
): CurriculumDraftBlock {
  if (block.type !== "code") return block;
  return { ...block, language: languageSlug };
}

function applyLanguageToInteraction(
  interaction: CurriculumDraftInteraction | null | undefined,
  languageSlug: LanguageKey,
): CurriculumDraftInteraction | null | undefined {
  if (!interaction) return interaction;

  if (interaction.type === "CLOZE") {
    return {
      ...interaction,
      file: {
        ...interaction.file,
        language: languageSlug,
      },
    };
  }

  return interaction;
}
