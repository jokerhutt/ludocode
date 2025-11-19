import type { LudoLesson } from "../Catalog/LudoLesson";
import type { CourseProgress } from "../Progress/CourseProgress";
import type { UserStreak } from "../Progress/UserStreak";
import type { UserCoins } from "../User/UserCoins";

export type LessonCompletionStatus = "OK" | "COURSE_COMPLETE" | "DUPLICATE";

export type LessonCompletionPacket = {
  content: LessonCompletionResponse;
  status: LessonCompletionStatus;
};

export type LessonCompletionResponse = {
  newCoins: UserCoins;
  newStreak: UserStreak;
  newCourseProgress: CourseProgress;
  updatedCompletedLesson: LudoLesson;
  accuracy: number;
};
