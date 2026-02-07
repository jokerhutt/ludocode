import { mutations } from "@/hooks/Queries/Definitions/mutations";
import { qk } from "@/hooks/Queries/Definitions/qk";
import {
  createLanguageSchema,
  type CreateLanguageFormInput,
  type LanguageMetadata,
  type PistonRuntime,
} from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
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
  currentLanguage?: LanguageMetadata;
};

export type LanguageFormField =
  | "name"
  | "slug"
  | "editorId"
  | "pistonId"
  | "base"
  | "iconName"
  | "extension"
  | "initialScript";

export type LanguageFieldDiff = {
  field: LanguageFormField;
  hasChanged: boolean;
  oldValue: string;
  newValue: string;
};

export function useLanguageForm({
  existingUserLanguages,
  runtimes,
  currentLanguage,
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

  const didInitRef = useRef(false);

  useEffect(() => {
    if (!currentLanguage) return;

    if (didInitRef.current) return;

    setLanguageName(currentLanguage.name);
    setEditorId(currentLanguage.editorId);
    setPistonId(currentLanguage.pistonId);
    setSlug(currentLanguage.slug);
    setInitialScript(currentLanguage.initialScript);
    setBase(currentLanguage.base);
    setIconName(currentLanguage.iconName as IconName);

    didInitRef.current = true;
  }, [currentLanguage]);

  // -------------------------
  // used ids
  // -------------------------

  const filteredLanguages = useMemo(() => {
    if (!currentLanguage) return existingUserLanguages;

    return existingUserLanguages.filter(
      (l) => l.languageId !== currentLanguage.languageId,
    );
  }, [existingUserLanguages, currentLanguage]);

  const usedEditorIds = useMemo(
    () => new Set(filteredLanguages.map((l) => l.editorId)),
    [filteredLanguages],
  );

  const usedPistonIds = useMemo(
    () => new Set(filteredLanguages.map((l) => l.pistonId)),
    [filteredLanguages],
  );

  const usedSlugs = useMemo(
    () => new Set(filteredLanguages.map((l) => l.slug)),
    [filteredLanguages],
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
    didInitRef.current = false;
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

export function useLanguageDiffs({
  languageName,
  slug,
  editorId,
  pistonId,
  base,
  iconName,
  initialScript,
  extension,
  currentLanguage,
}: {
  languageName: string;
  slug: string;
  editorId: string;
  pistonId: string;
  base: string;
  iconName: string;
  initialScript: string;
  extension: string;
  currentLanguage?: LanguageMetadata;
}): LanguageFieldDiff[] {
  return useMemo(() => {
    if (!currentLanguage) return [];

    const current = {
      name: languageName,
      slug,
      editorId,
      pistonId,
      base,
      iconName,
      initialScript,
      extension,
    };

    const original = {
      name: currentLanguage.name,
      slug: currentLanguage.slug,
      editorId: currentLanguage.editorId,
      pistonId: currentLanguage.pistonId,
      base: currentLanguage.base,
      iconName: currentLanguage.iconName ?? "",
      initialScript: currentLanguage.initialScript,
      extension: currentLanguage.extension,
    };

    const fields: LanguageFormField[] = [
      "name",
      "slug",
      "editorId",
      "pistonId",
      "base",
      "iconName",
      "initialScript",
      "extension",
    ];

    return fields.map((field) => {
      const oldValue = original[field];
      const newValue = current[field];

      return {
        field,
        hasChanged: oldValue !== newValue,
        oldValue,
        newValue,
      };
    });
  }, [
    languageName,
    slug,
    editorId,
    pistonId,
    base,
    iconName,
    initialScript,
    extension,
    currentLanguage,
  ]);
}
