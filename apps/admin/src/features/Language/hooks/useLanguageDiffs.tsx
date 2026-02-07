import type { LanguageMetadata } from "@ludocode/types";
import { useMemo } from "react";

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
