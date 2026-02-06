import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { qk } from "@/hooks/Queries/Definitions/qk";
import {
  createLanguageSchema,
  type CreateLanguageFormInput,
  type LanguageMetadata,
  type PistonRuntime,
} from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useMonaco } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
export function useCreateLanguage(closeModal?: () => void) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createLanguage(),
    onSuccess: (payload: LanguageMetadata[]) => {
      qc.setQueryData(qk.languages(), payload);
      closeModal?.();
    },
  });
}

export type MonacoLanguage = monaco.languages.ILanguageExtensionPoint;

type Params = {
  existingUserLanguages: LanguageMetadata[];
  runtimes: PistonRuntime[];
};

export function useCreateLanguageForm({
  existingUserLanguages,
  runtimes,
}: Params) {
  const monaco = useMonaco();

  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateLanguageFormInput, string>>
  >({});

  const validate = () => {
    const data = {
      name: languageName,
      slug,
      editorId,
      pistonId,
      base,
      iconName,
      initialScript,
      extension,
    };

    const result = createLanguageSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof CreateLanguageFormInput, string>
      > = {};

      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof CreateLanguageFormInput;
        fieldErrors[key] = issue.message;
      }

      // Check slug uniqueness even if Zod validation failed
      if (!slugAvailable && slug.length > 0) {
        fieldErrors.slug = fieldErrors.slug
          ? `${fieldErrors.slug} (also already exists)`
          : "Slug already exists";
      }

      setErrors(fieldErrors);
      return null;
    }

    if (!slugAvailable) {
      setErrors((prev) => ({
        ...prev,
        slug: "Slug already exists",
      }));
      return null;
    }

    setErrors({});
    return result.data;
  };

  // -------------------------
  // state
  // -------------------------

  const [languageName, setLanguageName] = useState("");
  const [editorId, setEditorId] = useState("");
  const [pistonId, setPistonId] = useState("");
  const [slug, setSlug] = useState("");
  const [initialScript, setInitialScript] = useState("");
  const [base, setBase] = useState("");
  const [iconName, setIconName] = useState<IconName | "">("");

  // -------------------------
  // used ids
  // -------------------------

  const usedEditorIds = useMemo(
    () => new Set(existingUserLanguages.map((l) => l.editorId)),
    [existingUserLanguages],
  );

  const usedPistonIds = useMemo(
    () => new Set(existingUserLanguages.map((l) => l.pistonId)),
    [existingUserLanguages],
  );

  const usedSlugs = useMemo(
    () => new Set(existingUserLanguages.map((l) => l.slug)),
    [existingUserLanguages],
  );

  // -------------------------
  // editor languages
  // -------------------------

  const editorLanguages = useMemo<MonacoLanguage[]>(() => {
    if (!monaco) return [];

    return monaco.languages
      .getLanguages()
      .filter((l) => !usedEditorIds.has(l.id));
  }, [monaco, usedEditorIds]);

  // -------------------------
  // runtimes
  // -------------------------

  const availableRuntimes = useMemo(() => {
    return runtimes.filter((rt) => !usedPistonIds.has(rt.language));
  }, [runtimes, usedPistonIds]);

  // -------------------------
  // derived extension
  // -------------------------

  const extension = useMemo(() => {
    if (!editorId) return "";

    const lang = editorLanguages.find((l) => l.id === editorId);
    return lang?.extensions?.[0] ?? "";
  }, [editorId, editorLanguages]);

  // -------------------------
  // helpers
  // -------------------------

  const reset = () => {
    setLanguageName("");
    setEditorId("");
    setPistonId("");
    setSlug("");
    setInitialScript("");
    setBase("");
    setIconName("");
    setErrors({});
  };

  const slugAvailable = slug.length > 0 && !usedSlugs.has(slug);

  return {
    // state
    languageName,
    editorId,
    pistonId,
    slug,
    initialScript,
    base,
    iconName,

    // setters
    setLanguageName,
    setEditorId,
    setPistonId,
    setSlug,
    setInitialScript,
    setBase,
    setIconName,

    // derived
    editorLanguages,
    availableRuntimes,
    extension,
    slugAvailable,

    // zod
    errors,
    validate,

    // utils
    reset,
  };
}
