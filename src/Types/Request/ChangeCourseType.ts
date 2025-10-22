import type { CourseProgress } from "../Progress/CourseProgress";
import type { LudoUser } from "../User/LudoUser";

export type ChangeCourseType = {
  user: LudoUser;
  courseProgress: CourseProgress;
  enrolled: string[];
};
