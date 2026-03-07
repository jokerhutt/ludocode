import { type LanguageMetadata } from "../Project/LanguageMetadata";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  isVisible?: boolean;
  courseIcon: string;
  language?: LanguageMetadata;
  description: string;
};

export type CourseType = "COURSE" | "SKILL_PATH";
