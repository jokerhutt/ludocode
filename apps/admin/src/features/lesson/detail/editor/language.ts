import type {
  CurriculumDraftBlock,
  CurriculumDraftInteraction,
  CurriculumDraftLessonForm,
  LanguageMetadata,
} from "@ludocode/types";

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
};

export function getLanguageSlug(language?: string | LanguageMetadata): string {
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

export function getLanguageDisplayName(
  language?: string | LanguageMetadata,
): string {
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

  return {
    ...draft,
    projectSnapshot: draft.projectSnapshot
      ? {
          ...draft.projectSnapshot,
          projectLanguage: languageMetadata,
          files: draft.projectSnapshot.files.map((file) => ({
            ...file,
            language: languageMetadata,
          })),
        }
      : draft.projectSnapshot,
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
