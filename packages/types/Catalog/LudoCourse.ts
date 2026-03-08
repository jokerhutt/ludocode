import { type LanguageMetadata } from "../Project/LanguageMetadata";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  courseStatus?: CourseStatus;
  courseIcon: string;
  language?: LanguageMetadata;
  description: string;
};

export type CourseType = "COURSE" | "SKILL_PATH";

export type CourseStatus = "DRAFT" | "ARCHIVED" | "PUBLISHED"
