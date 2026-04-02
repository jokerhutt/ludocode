import { type LanguageKey } from "../Project/ProjectFileSnapshot";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  courseStatus?: CourseStatus;
  courseIcon: string;
  codeLanguage?: LanguageKey;
  description: string;
};

export type CourseType = "COURSE" | "SKILL_PATH";

export type CourseStatus = "DRAFT" | "ARCHIVED" | "PUBLISHED";
