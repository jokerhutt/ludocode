import type { CourseProgress } from "../Progress/CourseProgress";
import type { LudoUser } from "../User/LudoUser";

export type ChangeCourseType = {
  courseProgress: CourseProgress;
  enrolled: string[];
};
