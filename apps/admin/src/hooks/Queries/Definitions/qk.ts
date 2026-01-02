export const qk = {
  courses: () => ["courses"] as const,
  courseSnapshot: (courseId: string) => ["snapshot", courseId] as const,
  user: (userId: string) => ["user", userId] as const,
  currentUser: () => ["currentUser"] as const,
};
