import type { LudoCourseSubject } from "./LudoCourseSubject";

export type LudoCourse = {
  id: string;
  title: string;
  courseType: CourseType;
  subject: LudoCourseSubject;
};

export type CourseType = "COURSE" | "SKILL_PATH";
