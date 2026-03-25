import type { LanguageMetadata } from "./LanguageMetadata";

export type ProjectFileSnapshot = {
  tempId?: string;
  path: string;
  language: LanguageMetadata;
  content: string;
};
