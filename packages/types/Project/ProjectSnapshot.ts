import type { LanguageMetadata } from "./LanguageMetadata";
import type { ProjectFileSnapshot } from "./ProjectFileSnapshot";

export type ProjectSnapshot = {
  projectId: string;
  projectName: string;
  projectLanguage: LanguageMetadata;
  projectType: ProjectType;
  deleteAt?: string;
  updatedAt?: number;
  files: ProjectFileSnapshot[];
  entryFilePath: string;
};

export type ProjectType = "WEB" | "CODE"

export type ProjectVisibility = "PUBLIC" | "PRIVATE" | "UNLISTED";
