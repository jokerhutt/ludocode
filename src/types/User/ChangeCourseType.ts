import type { CourseProgress } from "./CourseProgress.ts";
import type { LudoUser } from "./LudoUser.ts";

export type ChangeCourseType = {
  courseProgress: CourseProgress;
  enrolled: string[];
};
