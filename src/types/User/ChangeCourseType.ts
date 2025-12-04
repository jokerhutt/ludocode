import type { CourseProgress } from "./CourseProgress.ts";

export type ChangeCourseType = {
  courseProgress: CourseProgress;
  enrolled: string[];
};
