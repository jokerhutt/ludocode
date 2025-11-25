import type { LanguageType } from "./LanguageType";

export type ProjectFileSnapshot = {
  id?: string;
  tempId?: string;
  path: string;
  language: LanguageType;
  content: string;
};
