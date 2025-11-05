import type { CourseProgress } from "../Progress/CourseProgress";
import type { UserPreferences } from "../User/UserPreferences"

export type OnboardingResponse = {
    preferences: UserPreferences;
    courseProgressResponse: CourseProgress;
}