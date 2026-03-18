import { LanguageMetadata } from "./LanguageMetadata";
import { ProjectVisibility } from "./ProjectSnapshot";

export type ProjectCardResponse = {
  projectId: string;
  authorId: string;
  projectTitle: string;
  createdAt: number;
  visibility: ProjectVisibility;
  languageName: string;
  languageIconName: string;
};
