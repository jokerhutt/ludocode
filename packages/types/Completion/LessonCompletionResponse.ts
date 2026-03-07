import type { LudoLesson } from "../Catalog/LudoLesson.ts";
import type { CourseProgress } from "../User/CourseProgress.ts";
import type { UserStreak } from "../User/UserStreak.ts";
import type { UserCoins } from "../User/UserCoins.ts";

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

export type CompletionState = {
  courseId: string;
  moduleId: string;
  courseName: string;
  lessonId: string;
  courseIcon: string;
  search: CompletionSearch;
};

export type CompletionSearch = {
  step: "lesson" | "streak" | "course";
  coins: number;
  accuracy: number;
  oldStreak: number;
  newStreak: number;
  completionStatus: LessonCompletionStatus;
};
