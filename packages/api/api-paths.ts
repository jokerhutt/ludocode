export type ApiConfig = {
  apiPrefix: string;
  apiUrl: string;
  adminPrefix: string;
  demoAuthToken?: string;
};

export function createApiPaths({
  apiPrefix = "/api/v1",
  apiUrl,
  adminPrefix,
}: ApiConfig) {
  const API_PREFIX = apiPrefix;
  const API_PATH = apiUrl;
  const ADMIN_PREFIX = adminPrefix;
  const BASE = API_PATH + API_PREFIX;
  const ADMIN_BASE = BASE + ADMIN_PREFIX;

  return {
    ai: {
      base: `${BASE}/ai`,
      completions: `${BASE}/ai/completions`,
    },

    auth: {
      base: `${BASE}/auth`,
      firebase: `${BASE}/auth/firebase`,
      checkAdmin: `${ADMIN_BASE}/auth/check`,
      me: `${BASE}/auth/me`,
      logout: `${BASE}/auth/logout`,
    },

    catalog: {
      base: `${BASE}/catalog`,
      courses: `${BASE}/catalog/courses`,
      courseTree: (courseId: string) =>
        `${BASE}/catalog/courses/${courseId}/tree`,
      modules: (moduleIds: string) => `${BASE}/catalog/modules?${moduleIds}`,
    },

    credits: {
      base: `${BASE}/credits`,
    },

    features: {
      base: `${BASE}/features`,
    },

    languages: {
      base: `${BASE}/languages`,
      adminBase: `${ADMIN_BASE}/languages`,
      byId: (languageId: number) => `${BASE}/languages/${languageId}`,
      byAdminId: (languageId: number) =>
        `${ADMIN_BASE}/languages/${languageId}`,
    },

    lessons: {
      base: `${BASE}/lessons`,
      adminBase: `${ADMIN_BASE}/lessons`,
      lessons: (lessonIds: string) => `${BASE}/lessons?${lessonIds}`,
      lessonExercises: (lessonId: string) =>
        `${BASE}/lessons/${lessonId}/exercises`,
      byLessonCurriculum: (lessonId: string) =>
        `${ADMIN_BASE}/lessons/${lessonId}`,
    },

    progress: {
      coins: {
        base: `${BASE}/progress/coins`,
        byUserIds: (userIds: string) => `${BASE}/progress/coins?${userIds}`,
      },
      completion: {
        base: `${BASE}/progress/completion`,
      },
      courses: {
        base: `${BASE}/progress/courses`,
        byIds: (courseIds: string) => `${BASE}/progress/courses?${courseIds}`,
        stats: `${BASE}/progress/courses/stats`,
        statsByIds: (courseIds: string) =>
          `${BASE}/progress/courses/stats?${courseIds}`,
        enrolled: `${BASE}/progress/courses/enrolled`,
        current: `${BASE}/progress/courses/current`,
        reset: (courseId: string) =>
          `${BASE}/progress/courses/${courseId}/reset`,
      },
      streak: {
        base: `${BASE}/progress/streak`,
        weekly: `${BASE}/progress/streak?mode=weekly`,
      },
    },

    projects: {
      base: `${BASE}/projects`,
      byId: (projectId: string) => `${BASE}/projects/${projectId}`,
      name: (projectId: string) => `${BASE}/projects/${projectId}/name`,
    },

    runner: {
      base: `${BASE}/runner`,
      execute: `${BASE}/runner/executions`,
    },

    snapshots: {
      base: `${ADMIN_BASE}/snapshots`,
      course: `${ADMIN_BASE}/snapshots/course`,
      courses: `${ADMIN_BASE}/snapshots/courses`,
      byCourseVisibility: (courseId: string) => 
        `${ADMIN_BASE}/snapshots/${courseId}/visibility`,
      byCourseCurriculum: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/curriculum/${courseId}`,
      byCourseCurriculumSubject: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/subject`,
      byCourseCurriculumLanguage: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/language`,
      byCourseCurriculumIcon: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/icon`,
      byCourse: (courseId: string) => `${ADMIN_BASE}/snapshots/${courseId}`,
    },

    subjects: {
      base: `${BASE}/subjects`,
      adminBase: `${ADMIN_BASE}/subjects`,
      byId: (subjectId: number) => `${BASE}/subjects/${subjectId}`,
      byAdminId: (subjectId: number) => `${ADMIN_BASE}/subjects/${subjectId}`,
    },

    subscriptions: {
      base: `${BASE}/subscription`,
      checkout: `${BASE}/subscription/checkout`,
      confirm: `${BASE}/subscription/confirm`,
      manage: `${BASE}/subscription/manage`,
      plans: `${BASE}/subscription/plans`,
    },

    preferences: {
      base: `${BASE}/preferences`,
      careers: `${BASE}/preferences/careers`,
    },

    users: {
      base: `${BASE}/users`,
      byIds: (userIds: string) => `${BASE}/users?${userIds}`,
      me: `${BASE}/users/me`,
      avatar: `${BASE}/users/avatar`,
    },

    external: {
      piston: {
        runtimes: `https://emkc.org/api/v2/piston/runtimes`,
      },
    },
  };
}
