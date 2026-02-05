import type { LanguageMetadata } from "./LanguageMetadata";

export type ProjectFileSnapshot = {
  id?: string;
  tempId?: string;
  path: string;
  language: LanguageMetadata;
  content: string;
};
