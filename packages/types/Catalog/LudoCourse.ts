import { type LanguageMetadata } from "../Project/LanguageMetadata";
import type { LudoCourseSubject } from "./LudoCourseSubject";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  subject: LudoCourseSubject;
  language?: LanguageMetadata;
  description: string;
};

export type CourseType = "COURSE" | "SKILL_PATH";
