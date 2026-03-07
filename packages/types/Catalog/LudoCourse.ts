import { type LanguageMetadata } from "../Project/LanguageMetadata";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  courseIcon: string;
  language?: LanguageMetadata;
  description: string;
};

export type CourseType = "COURSE" | "SKILL_PATH";
