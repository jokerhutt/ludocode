export const qk = {
  activeFeatures: () => ["activeFeatures"] as const,
  courses: () => ["courses"] as const,
  credits: () => ["credits"] as const,
  courseTree: (courseId: string) => ["courseTree", courseId] as const,
  currentCourseId: () => ["currentCourseId"] as const,
  course: (courseId: string) => ["course", courseId] as const,
  module: (moduleId: string) => ["module", moduleId] as const,
  streak: (userId: string) => ["streak", userId] as const,
  streakPastWeek: () => ["pastWeekStreak"] as const,
  lesson: (lessonId: string) => ["lesson", lessonId] as const,
  exercises: (lessonId: string) => ["exercises", lessonId] as const,
  preferences: () => ["preferences"] as const,
  projects: () => ["projects"] as const,
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
