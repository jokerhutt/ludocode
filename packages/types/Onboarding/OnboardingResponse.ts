import type {
  CourseProgressWithEnrolled,
} from "../User/CourseProgress.ts";
import type { LudoUser } from "../User/LudoUser.ts";
import type { UserPreferences } from "../User/UserPreferences";

export type OnboardingResponse = {
  refreshedUser: LudoUser;
  preferences: UserPreferences;
  courseProgressResponse: CourseProgressWithEnrolled;
};
