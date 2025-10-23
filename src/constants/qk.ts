export const qk = {

    courses: () => ["courses"] as const,

    courseTree: (courseId: string) => ["courseTree", courseId] as const,
    course: (courseId: string) => ["course", courseId] as const,
    module: (moduleId: string) => ["module", moduleId] as const,
    lesson: (lessonId: string) => ["lesson", lessonId] as const, 
    exercises: (lessonId: string) => ["exercises", lessonId] as const,

    courseProgress: (courseId: string) => ["courseProgress", courseId] as const,

    modulesBySection: (courseId: string) => ["courses", courseId, "modules"] as const,
    lessonsByModule: (moduleId: string) => ["modules", moduleId, "lessons"] as const,

    enrolled: () => ["enrolled"] as const,
    user: (userId: string) => ["user", userId] as const,
    currentUser: () => ["currentUser"] as const,



}