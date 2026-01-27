export type ApiConfig = {
  apiPrefix: string;
  apiUrl: string;
  demoAuthToken?: string;
};

export function createApiPaths({
  apiPrefix = "/api/v1",
  apiUrl,
  demoAuthToken,
}: ApiConfig) {
  const API_PREFIX = apiPrefix;
  const API_PATH = apiUrl;
  const BASE = API_PATH + API_PREFIX;

  return {
    ai: {
      base: `${BASE}/ai`,
      completions: `${BASE}/ai/completions`,
    },

    auth: {
      base: `${BASE}/auth`,
      firebase: `${BASE}/auth/firebase`,
      me: `${BASE}/auth/me`,
      demo: demoAuthToken
        ? `${BASE}/auth/demo?token=${demoAuthToken}`
        : undefined,
      logout: `${BASE}/auth/logout`,
    },

    catalog: {
      base: `${BASE}/catalog`,
      courses: `${BASE}/catalog/courses`,
      courseTree: (courseId: string) =>
        `${BASE}/catalog/courses/${courseId}/tree`,
      modules: (moduleIds: string) => `${BASE}/catalog/modules?${moduleIds}`,
      lessons: (lessonIds: string) => `${BASE}/catalog/lessons?${lessonIds}`,
      lessonExercises: (lessonId: string) =>
        `${BASE}/catalog/lessons/${lessonId}/exercises`,
    },

    credits: {
      base: `${BASE}/credits`,
    },

    features: {
      base: `${BASE}/features`,
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
      base: `${BASE}/snapshots`,
      course: `${BASE}/snapshots/course`,
      byCourse: (courseId: string) => `${BASE}/snapshots/${courseId}`,
    },

    preferences: {
      base: `${BASE}/preferences`,
    },

    users: {
      base: `${BASE}/users`,
      byIds: (userIds: string) => `${BASE}/users?${userIds}`,
      me: `${BASE}/users/me`,
      avatar: `${BASE}/users/avatar`,
    },
  };
}
