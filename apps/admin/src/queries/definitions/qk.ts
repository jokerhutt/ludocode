export const qk = {
  courses: () => ["courses"] as const,
  languages: () => ["languages"] as const,
  subjects: () => ["subjects"] as const,
  activeFeatures: () => ["activeFeatures"] as const,
  banners: () => ["banners"] as const,
  courseSnapshot: (courseId: string) => ["snapshot", courseId] as const,
  curriculum: (courseId: string) => ["curriculum", courseId] as const,
  curriculumLesson: (lessonId: string) =>
    ["lessonCurriculum", lessonId] as const,
  user: (userId: string) => ["user", userId] as const,
  currentUser: () => ["currentUser"] as const,
  runtimes: () => ["runtimes"] as const,
};
