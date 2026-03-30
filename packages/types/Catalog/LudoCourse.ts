import { type LegacyLanguageMetadata } from "../Project/LanguageMetadata";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  courseStatus?: CourseStatus;
  courseIcon: string;
  codeLanguage?: string;
  description: string;
};

export type CourseType = "COURSE" | "SKILL_PATH";

export type CourseStatus = "DRAFT" | "ARCHIVED" | "PUBLISHED";
