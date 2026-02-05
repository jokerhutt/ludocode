import { LanguageMetadata } from "./ProjectSnapshot";

export type ProjectFileSnapshot = {
  id?: string;
  tempId?: string;
  path: string;
  language: LanguageMetadata;
  content: string;
};
