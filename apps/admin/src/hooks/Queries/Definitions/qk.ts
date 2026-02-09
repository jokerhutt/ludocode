export const qk = {
  courses: () => ["courses"] as const,
  languages: () => ["languages"] as const,
  subjects: () => ["subjects"] as const,
  courseSnapshot: (courseId: string) => ["snapshot", courseId] as const,
  user: (userId: string) => ["user", userId] as const,
  currentUser: () => ["currentUser"] as const,
  runtimes: () => ["runtimes"] as const,
};
