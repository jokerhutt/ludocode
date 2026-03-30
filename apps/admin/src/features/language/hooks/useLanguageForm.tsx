import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
import {
  languageFormSchema,
  type LanguageRuntime,
  type LanguageFormInput,
  type LanguageMetadata,
  type PistonRuntime,
} from "@ludocode/types";
import { useMonaco } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useEffect, useMemo, useRef, useState } from "react";

type Args = {
  existingUserLanguages: LanguageMetadata[];
  runtimes: PistonRuntime[];
  currentLanguage?: LanguageMetadata;
};

export type MonacoLanguage = monaco.languages.ILanguageExtensionPoint;

export function useLanguageForm({
  existingUserLanguages,
  runtimes,
  currentLanguage,
}: Args) {
  const monaco = useMonaco();

  const [errors, setErrors] = useState<
    Partial<Record<keyof LanguageFormInput, string>>
  >({});

  const validate = () => {
    const data = {
      name: languageName,
      slug,
      runtime,
      editorId,
      pistonId,
      runtimeVersion,
      base,
      iconName,
      initialScript,
      extension,
    };

    const result = languageFormSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LanguageFormInput, string>> = {};

      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LanguageFormInput;
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
  const [runtime, setRuntime] = useState<LanguageRuntime>("PISTON");
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
    setRuntime(currentLanguage.runtime);
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

  const usedSlugs = useMemo(
    () => new Set(filteredLanguages.map((l) => l.slug)),
    [filteredLanguages],
  );

  // -------------------------
  // editor languages
  // -------------------------

  const editorLanguages = useMemo<MonacoLanguage[]>(() => {
    if (!monaco) return [];
    return monaco.languages.getLanguages();
  }, [monaco]);

  // -------------------------
  // runtimes
  // -------------------------

  const availableRuntimes = useMemo(() => {
    return runtimes;
  }, [runtimes]);

  // -------------------------
  // derived extension
  // -------------------------

  const extension = useMemo(() => {
    if (!editorId) return "";

    const lang = editorLanguages.find((l) => l.id === editorId);
    return lang?.extensions?.[0] ?? "";
  }, [editorId, editorLanguages]);

  // -------------------------
  // derived runtime version
  // -------------------------

  const runtimeVersion = useMemo(() => {
    if (runtime !== "PISTON") return "";
    if (!pistonId) return "";
    const rt = runtimes.find((r) => r.language === pistonId);
    return rt?.version ?? "";
  }, [runtime, pistonId, runtimes]);

  // -------------------------
  // helpers
  // -------------------------

  const reset = () => {
    setLanguageName("");
    setRuntime("PISTON");
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
    runtime,
    editorId,
    pistonId,
    slug,
    initialScript,
    base,
    iconName,

    // setters
    setLanguageName,
    setRuntime,
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

export type UseLanguageFormResponse = ReturnType<typeof useLanguageForm>;
