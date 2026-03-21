import type {
  CurriculumDraftBlock,
  CurriculumDraftInteraction,
  CurriculumDraftLessonForm,
  LanguageMetadata,
} from "@ludocode/types";

type LanguageLike =
  | string
  | Pick<LanguageMetadata, "slug" | "name">
  | undefined;

const FALLBACK_LANGUAGE_NAME = "Python";
const FALLBACK_LANGUAGE_SLUG = "python";
const FALLBACK_EXTENSION = "py";

const FALLBACK_LANGUAGE: LanguageMetadata = {
  languageId: -1,
  name: FALLBACK_LANGUAGE_NAME,
  slug: FALLBACK_LANGUAGE_SLUG,
  editorId: FALLBACK_LANGUAGE_SLUG,
  pistonId: FALLBACK_LANGUAGE_SLUG,
  runtimeVersion: "",
  extension: FALLBACK_EXTENSION,
  base: FALLBACK_LANGUAGE_SLUG,
  iconName: "",
  initialScript: "",
  enabled: true,
};

export function getLanguageSlug(language?: LanguageLike): string {
  if (!language) return FALLBACK_LANGUAGE_SLUG;
  if (typeof language === "string") {
    const normalized = language.trim();
    return normalized.length > 0 ? normalized : FALLBACK_LANGUAGE_SLUG;
  }

  const normalized = language.slug?.trim();
  return normalized && normalized.length > 0
    ? normalized
    : FALLBACK_LANGUAGE_SLUG;
}

export function getLanguageDisplayName(language?: LanguageLike): string {
  if (!language) return FALLBACK_LANGUAGE_NAME;
  return typeof language === "string" ? language : language.name;
}

export function resolveCourseLanguage(
  courseLanguage?: LanguageMetadata,
): LanguageMetadata {
  return courseLanguage ?? FALLBACK_LANGUAGE;
}

export function getCourseLanguageSlug(
  courseLanguage?: LanguageMetadata,
): string {
  return getLanguageSlug(resolveCourseLanguage(courseLanguage));
}

export function getCourseLanguageExtension(
  courseLanguage?: LanguageMetadata,
): string {
  const extension = resolveCourseLanguage(courseLanguage)
    .extension?.trim()
    .replace(/^\./, "");
  return extension && extension.length > 0 ? extension : FALLBACK_EXTENSION;
}

export function getDefaultMainFilename(
  courseLanguage?: LanguageMetadata,
): string {
  return `main.${getCourseLanguageExtension(courseLanguage)}`;
}

export function applyCourseLanguageToLessonDraft(
  draft: CurriculumDraftLessonForm,
  courseLanguage?: LanguageMetadata,
): CurriculumDraftLessonForm {
  const languageMetadata = resolveCourseLanguage(courseLanguage);

  const normalizedSnapshot = draft.projectSnapshot
    ? normalizeProjectSnapshotForLessonType(
        draft.projectSnapshot,
        draft.lessonType,
        languageMetadata,
      )
    : draft.projectSnapshot;

  return {
    ...draft,
    projectSnapshot: normalizedSnapshot,
    exercises: draft.exercises.map((exercise) => ({
      ...exercise,
      blocks: exercise.blocks.map((block) =>
        applyLanguageToBlock(block, languageMetadata),
      ),
      interaction: applyLanguageToInteraction(
        exercise.interaction,
        languageMetadata,
      ),
    })),
  };
}

function normalizeProjectSnapshotForLessonType(
  projectSnapshot: NonNullable<CurriculumDraftLessonForm["projectSnapshot"]>,
  lessonType: CurriculumDraftLessonForm["lessonType"],
  languageMetadata: LanguageMetadata,
): NonNullable<CurriculumDraftLessonForm["projectSnapshot"]> {
  const normalizedFiles = projectSnapshot.files.map((file) => ({
    ...file,
    language: languageMetadata,
  }));

  if (lessonType !== "GUIDED") {
    return {
      ...projectSnapshot,
      projectLanguage: languageMetadata,
      files: normalizedFiles,
    };
  }

  const guidedFiles = normalizedFiles.slice(0, 1);
  const firstFile = guidedFiles[0];

  return {
    ...projectSnapshot,
    projectLanguage: languageMetadata,
    files: guidedFiles,
    entryFileId:
      firstFile?.id ?? firstFile?.tempId ?? projectSnapshot.entryFileId,
  };
}

function applyLanguageToBlock(
  block: CurriculumDraftBlock,
  languageMetadata: LanguageMetadata,
): CurriculumDraftBlock {
  if (block.type !== "code") return block;
  return { ...block, language: getLanguageSlug(languageMetadata) };
}

function applyLanguageToInteraction(
  interaction: CurriculumDraftInteraction | null | undefined,
  languageMetadata: LanguageMetadata,
): CurriculumDraftInteraction | null | undefined {
  if (!interaction) return interaction;

  if (interaction.type === "CLOZE") {
    return {
      ...interaction,
      file: {
        ...interaction.file,
        language: languageMetadata,
      },
    };
  }

  return interaction;
}
