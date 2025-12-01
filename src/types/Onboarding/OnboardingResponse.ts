import type { CourseProgress } from "../User/CourseProgress.ts";
import type { UserPreferences } from "../User/UserPreferences"

export type OnboardingResponse = {
    preferences: UserPreferences;
    courseProgressResponse: CourseProgress;
}