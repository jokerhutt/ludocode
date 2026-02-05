import type { LanguageMetadata } from "./LanguageMetadata";
import type { ProjectFileSnapshot } from "./ProjectFileSnapshot";

export type ProjectSnapshot = {
  projectId: string;
  projectName: string;
  projectLanguage: LanguageMetadata;
  updatedAt?: number;
  files: ProjectFileSnapshot[];
};
