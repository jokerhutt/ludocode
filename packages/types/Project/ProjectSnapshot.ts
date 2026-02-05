import type { ProjectFileSnapshot } from "./ProjectFileSnapshot";

export type ProjectSnapshot = {
  projectId: string;
  projectName: string;
  projectLanguage: LanguageMetadata;
  updatedAt?: number;
  files: ProjectFileSnapshot[];
};

export type LanguageMetadata = {
  languageId: number;
  slug: string;
  initialScript?: string;
  editorId: string;
  name: string;
}