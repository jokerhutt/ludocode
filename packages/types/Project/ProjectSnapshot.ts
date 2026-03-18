import type { LanguageMetadata } from "./LanguageMetadata";
import type { ProjectFileSnapshot } from "./ProjectFileSnapshot";

export type ProjectSnapshot = {
  projectId: string;
  projectName: string;
  projectLanguage: LanguageMetadata;
  deleteAt?: string;
  updatedAt?: number;
  files: ProjectFileSnapshot[];
  entryFileId: string;
  visibility: ProjectVisibility;
};

export type ProjectVisibility = "PUBLIC" | "PRIVATE" | "UNLISTED";
