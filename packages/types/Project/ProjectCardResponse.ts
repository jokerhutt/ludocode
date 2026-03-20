import { type ProjectVisibility } from "./ProjectSnapshot";

export type ProjectCardResponse = {
  projectId: string;
  authorId: string;
  projectTitle: string;
  createdAt: number;
  updatedAt: number;
  deleteAt?: string;
  visibility: ProjectVisibility;
  languageName: string;
  languageIconName: string;
};

export type ProjectCardResponseList = {
  projects: ProjectCardResponse[];
  page: number;
  totalPages: number;
  hasNext: boolean;
};

export type ProjectCardListResponse = ProjectCardResponseList;
