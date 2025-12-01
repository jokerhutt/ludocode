import type { LanguageType } from "./LanguageType";
import type { ProjectFileSnapshot } from "./ProjectFileSnapshot";

export type ProjectSnapshot = {
  projectId: string;
  projectName: string;
  projectLanguage: LanguageType;
  files: ProjectFileSnapshot[];
};
