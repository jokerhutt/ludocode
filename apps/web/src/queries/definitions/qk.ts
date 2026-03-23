import type { DiscussionTopic } from "@ludocode/types";

export const qk = {
  activeFeatures: () => ["activeFeatures"] as const,
  courses: () => ["courses"] as const,
  careers: () => ["careers"] as const,
  credits: () => ["credits"] as const,
  courseTree: (courseId: string) => ["courseTree", courseId] as const,
  currentCourseId: () => ["currentCourseId"] as const,
  course: (courseId: string) => ["course", courseId] as const,
  module: (moduleId: string) => ["module", moduleId] as const,
  streak: (userId: string) => ["streak", userId] as const,
  streakPastWeek: () => ["pastWeekStreak"] as const,
  subscription: () => ["subscription"] as const,
  plans: () => ["plans"] as const,
  languages: () => ["languages"] as const,
  lesson: (lessonId: string) => ["lesson", lessonId] as const,
  exercises: (lessonId: string) => ["exercises", lessonId] as const,
  preferences: () => ["preferences"] as const,
  communityProjects: () => ["communityProjects"] as const,

  // root
  projects: () => ["projects"] as const,

  // --- USER PROJECTS ---
  projectsUser: (userId: string) => ["projects", "user", userId] as const,

  projectsLike: (projectId: string) => ["projects", "like", projectId] as const,

  banners: () => ["banners"] as const,

  discussion: (entityId: string, topic: DiscussionTopic) => ["discussion", topic, entityId] as const,

  projectsUserPage: (userId: string, page: number, size: number) =>
    ["projects", "user", userId, page, size] as const,

  // --- COMMUNITY PROJECTS ---
  projectsCommunity: () => ["projects", "community"] as const,

  projectsCommunityPage: (page: number, size: number) =>
    ["projects", "community", page, size] as const,

  // --- SINGLE PROJECT ---
  project: (projectId: string) => ["projects", "detail", projectId] as const,

  courseProgress: (courseId: string) => ["courseProgress", courseId] as const,
  courseStats: (courseId: string) => ["courseStats", courseId] as const,
  modulesBySection: (courseId: string) =>
    ["courses", courseId, "modules"] as const,
  lessonsByModule: (moduleId: string) =>
    ["modules", moduleId, "lessons"] as const,
  userCoins: (userId: string) => ["coins", userId] as const,
  courseSnapshot: (courseId: string) => ["snapshot", courseId] as const,
  enrolled: () => ["enrolled"] as const,
  user: (userId: string) => ["user", userId] as const,
  currentUser: () => ["currentUser"] as const,

  onboardingDraft: () => ["onboarding", "draft"] as const,
  onboardingValidatedUpTo: () => ["onboarding", "validatedUpTo"] as const,
};
